import { Injectable } from '@nestjs/common';
import { DocumentsRepository } from '../../documents/documents.repository';
import { S3Record } from '../../../shared/types/sqs.types';

@Injectable()
export class DocumentsSQSHandler {
	constructor(private readonly db: DocumentsRepository) {}

	public handle(record: S3Record) {
		console.log('Record:', JSON.stringify(record, null, 2));
	}
}
