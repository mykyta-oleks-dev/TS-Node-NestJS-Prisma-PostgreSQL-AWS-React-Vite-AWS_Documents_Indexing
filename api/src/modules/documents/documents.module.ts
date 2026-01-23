import { Global, Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { S3Module } from '../s3/s3.module';
import { DocumentsRepository } from './documents.repository';

@Global()
@Module({
	providers: [DocumentsRepository],
	exports: [DocumentsRepository],
})
export class DocumentsDomainModule {}

@Module({
	imports: [S3Module, DocumentsDomainModule],
	controllers: [DocumentsController],
	providers: [DocumentsService],
})
export class DocumentsModule {}
