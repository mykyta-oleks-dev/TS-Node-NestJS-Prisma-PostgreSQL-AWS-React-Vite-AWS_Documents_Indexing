export interface IDocument {
	id: string;
	userEmail: string;
	filename: string;
	key: string;
	mimeType: string;
	status: 'pending' | 'success' | 'error';
	highlights: Record<string, string[]> | undefined;
}

export interface DBDocument extends IDocument {
	uploadedAt: string;
}

export interface Document extends IDocument {
	uploadedAt: Date;
}

export const convertDBDocument = (doc: DBDocument) => ({
	...doc,
	uploadedAt: new Date(doc.uploadedAt),
});
