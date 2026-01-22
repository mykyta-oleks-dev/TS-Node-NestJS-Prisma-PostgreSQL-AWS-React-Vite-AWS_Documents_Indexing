import { Body, Controller, Get, Post } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { DocumentsService } from './documents.service';
import { GetPutPresignedUrlDto } from './dtos/presigned-url.dto';

@Controller('documents')
export class DocumentsController {
	constructor(
		private readonly documentsService: DocumentsService,
		private readonly s3Service: S3Service,
	) {}

	@Get()
	public getHello(): string {
		return 'Hello from DocumentsController';
	}

	@Post('presigned-url')
	public async getPresignedUrl(@Body() body: GetPutPresignedUrlDto) {
		return await this.documentsService.getPresignedUrl(body);
	}
}
