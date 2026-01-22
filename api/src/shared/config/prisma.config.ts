import { registerAs } from '@nestjs/config';

export interface PrismaConfig {
	databaseUrl: string;
}

const prismaConfig = registerAs(
	'prisma',
	(): PrismaConfig => ({
		databaseUrl: process.env.DATABASE_URL ?? '',
	}),
);

export default prismaConfig;
