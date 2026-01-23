import { registerAs } from '@nestjs/config';

export interface OpenSearchConfig {
	node: string;
	index: string;
	username: string;
	password: string;
}

const openSearchConfig = registerAs(
	'openSearch',
	(): OpenSearchConfig => ({
		node: process.env.OPENSEARCH_NODE || '',
		index: process.env.OPENSEARCH_INDEX || 'documents',
		username: process.env.OPENSEARCH_USERNAME || '',
		password: process.env.OPENSEARCH_PASSWORD || '',
	}),
);

export default openSearchConfig;
