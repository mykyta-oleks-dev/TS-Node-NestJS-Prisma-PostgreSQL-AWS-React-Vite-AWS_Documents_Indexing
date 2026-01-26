import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';
import TypedConfigService from '../../shared/types/config-service.types';
import { OpenSearchConfig } from '../../shared/config/opensearch.config';
import { Document } from '../../generated/prisma/client';

@Injectable()
export class OpenSearchService implements OnModuleInit {
	private readonly client: Client;
	private index: string;
	private isOnline = false;

	constructor(private readonly configService: TypedConfigService) {
		const openSearchConfig =
			this.configService.get<OpenSearchConfig>('openSearch');

		if (!openSearchConfig) {
			throw new Error('OpenSearch configuration is missing');
		}

		this.client = new Client({
			node: openSearchConfig.node,
			auth: {
				username: openSearchConfig.username,
				password: openSearchConfig.password,
			},
		});
		this.index = openSearchConfig.index;
	}

	async onModuleInit() {
		await this.ensureIndex();
	}

	private async ensureIndex() {
		try {
			const exists = await this.client.indices.exists({
				index: this.index,
			});

			if (!exists.body) {
				await this.client.indices.create({
					index: this.index,
					body: {
						mappings: {
							properties: {
								textContent: { type: 'text' },
								filename: { type: 'keyword' },
							},
						},
					},
				});
			}

			this.isOnline = true;
			console.log('OpenSearch index is ready.');
		} catch (error) {
			console.error(
				'Error ensuring OpenSearch index:',
				(error as Error).message,
				'\nIndexing is disabled.',
			);
		}
	}

	public async indexDocument(document: Document, textContent: string) {
		if (!this.isOnline) {
			return false;
		}

		const response = await this.client.index({
			index: this.index,
			id: document.id,
			body: {
				textContent,
				filename: document.filename,
			},
		});

		return response;
	}

	public async deleteDocument(documentId: string) {
		if (!this.isOnline) {
			return false;
		}

		return await this.client.delete({
			index: this.index,
			id: documentId,
		});
	}

	public async search(query: string) {
		if (!this.isOnline) {
			return [];
		}

		const response = await this.client.search({
			index: this.index,
			body: {
				query: {
					match: {
						textContent: {
							query,
							fuzziness: 'AUTO',
						},
					},
				},
				highlight: {
					fields: {
						textContent: {},
					},
				},
			},
		});

		return response.body.hits.hits;
	}
}
