import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	Req,
	Sse,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { GeneratePutUrlBodyDto } from './dtos/presigned-url.body.dto';
import { GetDocumentsQueryDto } from './dtos/get-documents.query.dto';
import { UseEmailAuthGuard } from '../../shared/guards/email.guard';
import { type Request } from 'express';
import { DocumentsEventsService } from './services/documents-events.service';
import { filter, map } from 'rxjs';

@Controller('documents')
export class DocumentsController {
	constructor(
		private readonly documentsService: DocumentsService,
		private readonly events: DocumentsEventsService,
	) {}

	@Get()
	@UseEmailAuthGuard()
	public getDocumentsByEmail(
		@Query() { query }: GetDocumentsQueryDto,
		@Req() { user }: Request,
	) {
		if (user) return this.documentsService.getDocuments(user, query);
	}

	@Post('presigned-url')
	@UseEmailAuthGuard()
	public async getPresignedUrl(
		@Body() body: GeneratePutUrlBodyDto,
		@Req() { user }: Request,
	) {
		if (user !== body.email) {
			throw new ForbiddenException(
				'Cannot create documents for other accounts',
			);
		}

		return await this.documentsService.getPresignedUrl(body);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseEmailAuthGuard()
	public async deleteDocument(
		@Param('id') id: string,
		@Req() { user }: Request,
	) {
		const document = await this.documentsService.getDocument(id);

		if (document.userEmail !== user) {
			throw new ForbiddenException(
				'Delete requests are forbidden from wrong accounts',
			);
		}

		return await this.documentsService.deleteDocument(document);
	}

	@Sse('events')
	public documentsEvents(@Query('email') email: string) {
		return this.events.asObservable().pipe(
			filter((e) => e.email === email),
			map((event) => ({
				data: event,
			})),
		);
	}
}
