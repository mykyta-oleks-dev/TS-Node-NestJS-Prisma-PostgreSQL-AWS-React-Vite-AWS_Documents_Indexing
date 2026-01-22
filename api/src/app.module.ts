import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './modules/documents/documents.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { S3Module } from './modules/s3/s3.module';
import {
	appConfigOptions,
	TypedConfigModule,
} from './shared/config/app.config';

@Module({
	imports: [
		ConfigModule.forRoot(appConfigOptions),
		TypedConfigModule,
		PrismaModule,
		DocumentsModule,
		S3Module,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
