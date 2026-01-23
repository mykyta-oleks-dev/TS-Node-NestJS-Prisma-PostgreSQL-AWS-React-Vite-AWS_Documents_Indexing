import { Injectable, OnModuleInit } from '@nestjs/common';
import TypedConfigService from '../../shared/types/config-service.types';
import {
	DeleteMessageCommand,
	Message,
	ReceiveMessageCommand,
	SQSClient,
} from '@aws-sdk/client-sqs';
import { AWSConfig } from '../../shared/config/aws.config';
import { type SQSBodyParsed, isS3Record } from '../../shared/types/sqs.types';
import { DocumentsSQSHandler } from './handlers/documents.handler';

@Injectable()
export class SQSService implements OnModuleInit {
	private readonly sqs: SQSClient;
	private readonly queueUrl: string;

	constructor(
		private readonly configService: TypedConfigService,
		private readonly documentsSQSHandler: DocumentsSQSHandler,
	) {
		const awsConfig = configService.get<AWSConfig>('aws');

		if (!awsConfig) {
			throw new Error('AWS configuration is missing');
		}

		this.sqs = new SQSClient({
			region: awsConfig.region,
			credentials: {
				accessKeyId: awsConfig.accessKeyId,
				secretAccessKey: awsConfig.secretAccessKey,
			},
		});

		this.queueUrl = awsConfig.sqsQueueUrl;
	}

	onModuleInit() {
		void this.poll();
	}

	async poll() {
		while (true) {
			try {
				const res = await this.sqs.send(
					new ReceiveMessageCommand({
						QueueUrl: this.queueUrl,
						MaxNumberOfMessages: 10,
						WaitTimeSeconds: 20,
						VisibilityTimeout: 30,
					}),
				);

				if (!res.Messages?.length) continue;

				for (const message of res.Messages) {
					this.handleMessage(message);

					await this.sqs.send(
						new DeleteMessageCommand({
							QueueUrl: this.queueUrl,
							ReceiptHandle: message.ReceiptHandle,
						}),
					);
				}
			} catch (err) {
				console.error('Error polling SQS:', err);
				await this.sleep(5000);
			}
		}
	}

	handleMessage(message: Message) {
		if (!message.Body) return message;

		const body = JSON.parse(message.Body) as SQSBodyParsed;

		console.log(JSON.stringify(body, null, 2));

		if (!body.Records) return message;

		for (const record of body.Records) {
			if (isS3Record(record)) {
				this.documentsSQSHandler.handle(record);
			} else {
				console.log('Unknown record:', JSON.stringify(record, null, 2));
			}
		}
	}

	sleep(ms: number) {
		return new Promise((r) => setTimeout(r, ms));
	}
}
