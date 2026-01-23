import { Module } from '@nestjs/common';
import { SQSService } from './sqs.service';
import { DocumentsDomainModule } from '../documents/documents.module';
import { DocumentsSQSHandler } from './handlers/documents.handler';
import { S3Module } from '../s3/s3.module';

@Module({
	imports: [DocumentsDomainModule, S3Module],
	providers: [SQSService, DocumentsSQSHandler],
})
export class SQSModule {}
