import { Injectable } from '@nestjs/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import TypedConfigService from '../../shared/types/config-service.types';
import { AWSConfig } from '../../shared/config/aws.config';
import { DocumentContentType } from '../../shared/types/document.types';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
	private readonly s3: S3Client;
	private readonly bucketName: string;

	constructor(private readonly configService: TypedConfigService) {
		const awsConfig = configService.get<AWSConfig>('aws');

		if (!awsConfig) {
			throw new Error('AWS configuration is missing');
		}

		this.s3 = new S3Client({
			region: awsConfig.region,
			credentials: {
				accessKeyId: awsConfig.accessKeyId,
				secretAccessKey: awsConfig.secretAccessKey,
			},
		});

		this.bucketName = awsConfig.bucketName;
	}

	public async generatePutPresignedUrl(
		key: string,
		contentType: DocumentContentType,
		expiresIn = 60,
	) {
		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			ContentType: contentType,
			Key: key,
		});

		return await getSignedUrl(this.s3, command, { expiresIn });
	}

	public async getFile(key: string) {
		const command = new GetObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});

		const response = await this.s3.send(command);

		if (!response.Body) {
			throw new Error('File not found in S3');
		}

		return response.Body as Readable;
	}

	public async streamToBuffer(stream: Readable): Promise<Buffer> {
		const chunks: Buffer[] = [];
		for await (const chunk of stream) {
			chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
		}
		return Buffer.concat(chunks);
	}

	public async deleteFile(key: string) {
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});

		await this.s3.send(command);
	}
}
