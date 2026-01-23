import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { GeneratePutUrlBodyDto } from './dtos/presigned-url.body.dto';
import { DocumentsRepository } from './documents.repository';

@Injectable()
export class DocumentsService {
	constructor(
		private readonly s3: S3Service,
		private readonly db: DocumentsRepository,
	) {}

	public async getDocuments(email: string) {
		return this.db.getDocuments(email);
	}

	public async getPresignedUrl(body: GeneratePutUrlBodyDto) {
		const document = await this.db.createDocumentRecord(body);

		const url = await this.s3.generatePutPresignedUrl(
			document.key,
			body.contentType,
		);

		return { url, document };
	}
}
