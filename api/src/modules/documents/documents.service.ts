import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { GetPutPresignedUrlBodyDto } from './dtos/presigned-url.body.dto';
import { PrismaService } from '../prisma/prisma.service';
import { extensions } from '../../shared/types/document.types';

@Injectable()
export class DocumentsService {
	constructor(
		private readonly s3: S3Service,
		private readonly prisma: PrismaService,
	) {}

	public async listDocumentsByEmail(email: string) {
		return this.prisma.document.findMany({
			where: {
				userEmail: email,
			},
			orderBy: {
				uploadedAt: 'desc',
			},
		});
	}

	public async getPresignedUrl(body: GetPutPresignedUrlBodyDto) {
		const prefix = extensions[body.contentType];

		const filename = body.filename.endsWith(prefix)
			? body.filename
			: `${body.filename}${prefix}`;

		const now = new Date();

		const key = `${body.email}/${now.getTime()}_${filename}`;

		const document = await this.prisma.document.create({
			data: {
				filename,
				key,
				userEmail: body.email,
				mimeType: body.contentType,
				uploadedAt: now,
			},
		});

		const url = await this.s3.generatePutPresignedUrl(
			key,
			body.contentType,
		);

		return { url, document };
	}
}
