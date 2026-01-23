import { ConfigService } from '@nestjs/config';
import { AWSConfig } from '../config/aws.config';
import { PrismaConfig } from '../config/prisma.config';
import { OpenSearchConfig } from '../config/opensearch.config';

export default interface ConfigType {
	aws: AWSConfig;
	prisma: PrismaConfig;
	openSearch: OpenSearchConfig;
}

export default class TypedConfigService extends ConfigService<ConfigType> {}
