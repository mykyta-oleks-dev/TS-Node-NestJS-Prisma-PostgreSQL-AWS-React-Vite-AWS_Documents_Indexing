import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from '../../documents/documents.repository';
import { S3Record } from '../../../shared/types/sqs.types';
import { S3Service } from '../../s3/s3.service';
import { DocumentTextService } from '../../documents/services/document-text.service';

@Injectable()
export class DocumentsSQSHandler {
	constructor(
		private readonly db: DocumentsRepository,
		private readonly s3: S3Service,
		private readonly documentTextService: DocumentTextService,
	) {}

	public async handle(record: S3Record) {
		const key = decodeURIComponent(record.s3.object.key);

		const document = await this.db.getDocumentByKey(key);

		if (!document) {
			console.error(`Document with key ${key} not found in database.`);
			return;
		}

		const stream = await this.s3.getFile(key);
		const buffer = await this.s3.streamToBuffer(stream);

		if (buffer.length === 0) {
			throw new Error(`Document "${key}" not yet available, retrying`);
		}

		const text = await this.documentTextService.extract(buffer);

		console.log(text);
	}
}
