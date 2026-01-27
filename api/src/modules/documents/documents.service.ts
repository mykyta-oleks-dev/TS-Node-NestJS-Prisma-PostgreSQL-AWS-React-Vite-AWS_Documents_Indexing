import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { GeneratePutUrlBodyDto } from './dtos/presigned-url.body.dto';
import { DocumentsRepository } from './documents.repository';
import { OpenSearchService } from '../opensearch/opensearch.service';
import { Document } from '../../generated/prisma/client';

@Injectable()
export class DocumentsService {
	constructor(
		private readonly s3: S3Service,
		private readonly db: DocumentsRepository,
		private readonly openSearchService: OpenSearchService,
	) {}

	public async getDocuments(email: string, query?: string) {
		if (!query) {
			return (await this.db.getDocuments(email)).map((doc) => ({
				...doc,
				highlights: undefined,
			}));
		}

		const hits = await this.openSearchService.search(query);

		if (hits.length === 0) {
			return [];
		}

		const documentIds = hits.map((hit) => hit._id);

		const documents = await this.db.getDocuments(email, documentIds);
		const documentsHighlights = documents.map((document) => {
			const hit = hits.find((h) => h._id === document.id);
			return {
				...document,
				highlights: hit?.highlight,
			};
		});
		return documentsHighlights;
	}

	public async getDocument(id: string) {
		const document = await this.db.getDocumentById(id);

		if (!document) {
			throw new NotFoundException('Document not found');
		}

		return document;
	}

	public async getPresignedUrl(body: GeneratePutUrlBodyDto) {
		const document = await this.db.createDocumentRecord(body);

		const url = await this.s3.generatePutPresignedUrl(
			document.key,
			body.contentType,
			body.size,
		);

		return { url, document };
	}

	public async deleteDocument(document: Document) {
		if (document) await this.s3.deleteFile(document.key);
	}
}
