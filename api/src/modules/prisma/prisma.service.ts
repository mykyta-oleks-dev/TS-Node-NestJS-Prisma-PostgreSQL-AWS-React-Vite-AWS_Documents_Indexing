import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import TypedConfigService from '../../shared/types/config-service.types';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaConfig } from '../../shared/config/prisma.config';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(private readonly configService: TypedConfigService) {
		const connectionString =
			configService.get<PrismaConfig>('prisma')?.databaseUrl;

		const adapter = new PrismaPg({ connectionString });
		super({ adapter });
	}

	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
