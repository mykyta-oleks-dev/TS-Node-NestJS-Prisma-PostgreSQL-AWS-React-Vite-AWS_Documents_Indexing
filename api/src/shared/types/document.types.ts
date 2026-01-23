import {
	PDF_DOCUMENT_TYPE,
	WORD_DOCUMENT_TYPE_DOC,
	WORD_DOCUMENT_TYPE_DOCX,
} from '../constants/document.constants';

export const documentContentTypes = [
	PDF_DOCUMENT_TYPE,
	WORD_DOCUMENT_TYPE_DOC,
	WORD_DOCUMENT_TYPE_DOCX,
] as const;

export const extensions = {
	[PDF_DOCUMENT_TYPE]: '.pdf',
	[WORD_DOCUMENT_TYPE_DOC]: '.doc',
	[WORD_DOCUMENT_TYPE_DOCX]: '.docx',
} as const;

export type DocumentContentType =
	| typeof PDF_DOCUMENT_TYPE
	| typeof WORD_DOCUMENT_TYPE_DOC
	| typeof WORD_DOCUMENT_TYPE_DOCX;

export function isDocument(
	contentType: string,
): contentType is DocumentContentType {
	return documentContentTypes.includes(contentType as DocumentContentType);
}
