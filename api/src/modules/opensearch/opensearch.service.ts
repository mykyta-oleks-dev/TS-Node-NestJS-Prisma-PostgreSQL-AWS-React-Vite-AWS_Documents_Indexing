import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';
import TypedConfigService from '../../shared/types/config-service.types';
import { OpenSearchConfig } from '../../shared/config/opensearch.config';
import { Document } from '../../generated/prisma/client';

@Injectable()
export class OpenSearchService implements OnModuleInit {
	private readonly client: Client;
	private index: string;

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
	}

	public async indexDocument(document: Document, textContent: string) {
		const response = await this.client.index({
			index: this.index,
			id: document.id,
			body: {
				textContent,
				filename: document.filename,
			},
		});

		console.log(response);
	}

	public async deleteDocument(documentId: string) {
		await this.client.delete({
			index: this.index,
			id: documentId,
		});
	}
}
