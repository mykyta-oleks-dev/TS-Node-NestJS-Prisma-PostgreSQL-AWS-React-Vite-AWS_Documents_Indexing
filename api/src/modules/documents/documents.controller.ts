import { Body, Controller, Get, Post } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { DocumentsService } from './documents.service';
import { GetPutPresignedUrlDto } from './dtos/presigned-url.dto';
import { GetDocumentsDto } from './dtos/get-documents.dto';

@Controller('documents')
export class DocumentsController {
	constructor(
		private readonly documentsService: DocumentsService,
		private readonly s3Service: S3Service,
	) {}

	@Get()
	public getDocumentsByEmail(@Body() { email }: GetDocumentsDto) {
		return this.documentsService.listDocumentsByEmail(email);
	}

	@Post('presigned-url')
	public async getPresignedUrl(@Body() body: GetPutPresignedUrlDto) {
		return await this.documentsService.getPresignedUrl(body);
	}
}
