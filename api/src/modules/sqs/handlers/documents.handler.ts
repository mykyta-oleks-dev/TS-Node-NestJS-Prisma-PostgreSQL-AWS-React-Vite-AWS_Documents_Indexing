import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from '../../documents/documents.repository';
import { S3Record } from '../../../shared/types/sqs.types';
import { S3Service } from '../../s3/s3.service';
import { DocumentTextService } from '../../documents/services/document-text.service';
import { Document } from '../../../generated/prisma/client';
import { OpenSearchService } from '../../opensearch/opensearch.service';

@Injectable()
export class DocumentsSQSHandler {
	constructor(
		private readonly db: DocumentsRepository,
		private readonly s3: S3Service,
		private readonly documentTextService: DocumentTextService,
		private readonly openSearchService: OpenSearchService,
	) {}

	public async handle(record: S3Record) {
		const key = decodeURIComponent(record.s3.object.key);

		const document = await this.db.getDocumentByKey(key);

		if (!document) {
			console.error(`Document with key ${key} not found in database.`);
			return;
		}

		if (record.eventName === 'ObjectCreated:Put') {
			await this.processObjectCreated(document, key);
		} else if (record.eventName === 'ObjectRemoved:Delete') {
			await this.processObjectDeleted(document);
		}
	}

	private async processObjectCreated(document: Document, key: string) {
		try {
			const stream = await this.s3.getFile(key);
			const buffer = await this.s3.streamToBuffer(stream);

			if (buffer.length === 0) {
				throw new Error(
					`Document "${key}" not yet available, retrying`,
				);
			}

			const text = await this.documentTextService.extract(buffer);

			await this.openSearchService.indexDocument(document, text);
			await this.db.setStatus(document.id, 'success');
			console.log(`Document "${key}" is processed`);
		} catch (error) {
			console.error(
				`Error processing document with key ${key}:`,
				(error as Error).message,
			);
			await this.db.setStatus(document.id, 'error');
		}
	}

	private async processObjectDeleted(document: Document) {
		try {
			await this.openSearchService.deleteDocument(document.id);
			await this.db.deleteDocument(document.id);
		} catch (error) {
			console.error(
				`Error deleting document with id ${document.id} from OpenSearch:`,
				(error as Error).message,
			);
		}
	}
}
