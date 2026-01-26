import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GeneratePutUrlBodyDto } from './dtos/presigned-url.body.dto';
import { extensions } from '../../shared/types/document.types';
import { Status } from '../../generated/prisma/enums';

@Injectable()
export class DocumentsRepository {
	constructor(private readonly prisma: PrismaService) {}

	public async getDocuments(email: string, ids?: string[]) {
		return this.prisma.document.findMany({
			where: {
				userEmail: email,
				id: { in: ids },
			},
			orderBy: {
				uploadedAt: 'desc',
			},
		});
	}

	public async getDocumentById(id: string) {
		return this.prisma.document.findUnique({ where: { id } });
	}

	public async getDocumentByKey(key: string) {
		return this.prisma.document.findUnique({ where: { key } });
	}

	public async createDocumentRecord(body: GeneratePutUrlBodyDto) {
		const extension = extensions[body.contentType];

		const filename = body.filename.endsWith(extension)
			? body.filename
			: `${body.filename}${extension}`;

		const now = new Date();

		const key = `${body.email}/${now.getTime()}_${filename.replaceAll(' ', '+')}`;

		return await this.prisma.document.create({
			data: {
				filename,
				key,
				userEmail: body.email,
				mimeType: body.contentType,
				uploadedAt: now,
			},
		});
	}

	public async setStatus(id: string, status: Status) {
		return this.prisma.document.update({
			where: { id },
			data: { status },
		});
	}

	public async deleteDocument(id: string) {
		return this.prisma.document.delete({
			where: { id },
		});
	}
}
