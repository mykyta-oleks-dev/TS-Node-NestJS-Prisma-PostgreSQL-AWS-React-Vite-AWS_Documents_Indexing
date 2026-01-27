import {
	PDF_DOCUMENT_TYPE,
	WORD_DOCUMENT_TYPE_DOCX,
} from '@/constants/document.constants';

export const documentContentTypes = [
	PDF_DOCUMENT_TYPE,
	WORD_DOCUMENT_TYPE_DOCX,
] as const;

export const extensions = {
	[PDF_DOCUMENT_TYPE]: '.pdf',
	[WORD_DOCUMENT_TYPE_DOCX]: '.docx',
} as const;

export type DocumentContentType =
	| typeof PDF_DOCUMENT_TYPE
	| typeof WORD_DOCUMENT_TYPE_DOCX;

export type Status = 'pending' | 'success' | 'error';

export interface IDocument {
	id: string;
	userEmail: string;
	filename: string;
	key: string;
	mimeType: DocumentContentType;
	status: Status;
	highlights: { textContent: string[] } | undefined;
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
