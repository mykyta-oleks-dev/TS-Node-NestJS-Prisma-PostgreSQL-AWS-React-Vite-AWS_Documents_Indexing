import { Module } from '@nestjs/common';
import { SQSService } from './sqs.service';
import { DocumentsDomainModule } from '../documents/documents.module';
import { DocumentsSQSHandler } from './handlers/documents.handler';

@Module({
	imports: [DocumentsDomainModule],
	providers: [SQSService, DocumentsSQSHandler],
})
export class SQSModule {}
