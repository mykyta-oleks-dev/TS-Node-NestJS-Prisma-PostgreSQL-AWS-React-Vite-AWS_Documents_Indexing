import { ConfigService } from '@nestjs/config';
import { AWSConfig } from '../config/aws.config';
import { PrismaConfig } from '../config/prisma.config';

export default interface ConfigType {
	aws: AWSConfig;
	prisma: PrismaConfig;
}

export default class TypedConfigService extends ConfigService<ConfigType> {}
