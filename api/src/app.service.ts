import { Injectable } from '@nestjs/common';
import { PrismaService } from './modules/prisma/prisma.service';

@Injectable()
export class AppService {
	constructor(private readonly prisma: PrismaService) {}

	async getHello() {
		const result = await this.prisma.$queryRaw`SELECT 1+1 AS sum;`;

		return `Hello World! Database result: ${JSON.stringify(result)}`;
	}
}
