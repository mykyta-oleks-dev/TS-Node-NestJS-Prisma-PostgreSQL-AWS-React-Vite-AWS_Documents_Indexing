import { Global, Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { S3Module } from '../s3/s3.module';
import { DocumentsRepository } from './documents.repository';
import { DocumentsTextService } from './services/documents-text.service';
import { OpenSearchModule } from '../opensearch/opensearch.module';
import { DocumentsEventsService } from './services/documents-events.service';

@Global()
@Module({
	providers: [
		DocumentsTextService,
		DocumentsEventsService,
		DocumentsRepository,
	],
	exports: [
		DocumentsTextService,
		DocumentsEventsService,
		DocumentsRepository,
	],
})
export class DocumentsDomainModule {}

@Module({
	imports: [S3Module, DocumentsDomainModule, OpenSearchModule],
	controllers: [DocumentsController],
	providers: [DocumentsService],
})
export class DocumentsModule {}
