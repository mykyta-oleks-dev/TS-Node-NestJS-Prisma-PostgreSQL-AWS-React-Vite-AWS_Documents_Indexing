import { Module } from '@nestjs/common';
import { DocumentsDomainModule } from '../documents/documents.module';
import { OpenSearchModule } from '../opensearch/opensearch.module';
import { S3Module } from '../s3/s3.module';
import { DocumentsSQSHandler } from './handlers/documents.handler';
import { SQSService } from './sqs.service';

@Module({
	imports: [DocumentsDomainModule, S3Module, OpenSearchModule],
	providers: [SQSService, DocumentsSQSHandler],
})
export class SQSModule {}
