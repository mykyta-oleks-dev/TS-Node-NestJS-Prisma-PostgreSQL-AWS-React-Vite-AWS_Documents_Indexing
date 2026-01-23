import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { DocumentsService } from './documents.service';
import { GeneratePutUrlBodyDto } from './dtos/presigned-url.body.dto';
import { GetDocumentsQueryDto } from './dtos/get-documents.query.dto';

@Controller('documents')
export class DocumentsController {
	constructor(
		private readonly documentsService: DocumentsService,
		private readonly s3Service: S3Service,
	) {}

	@Get()
	public getDocumentsByEmail(@Query() { email }: GetDocumentsQueryDto) {
		return this.documentsService.getDocuments(email);
	}

	@Post('presigned-url')
	public async getPresignedUrl(@Body() body: GeneratePutUrlBodyDto) {
		return await this.documentsService.getPresignedUrl(body);
	}
}
