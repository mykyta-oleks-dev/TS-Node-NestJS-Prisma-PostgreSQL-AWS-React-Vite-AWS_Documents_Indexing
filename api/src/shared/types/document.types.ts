export const documentContentTypes = [
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

export const extensions = {
	[documentContentTypes[0]]: '.pdf',
	[documentContentTypes[1]]: '.doc',
	[documentContentTypes[2]]: '.docx',
} as const;

export type DocumentContentType = (typeof documentContentTypes)[number];

export function isDocument(
	contentType: string,
): contentType is DocumentContentType {
	return documentContentTypes.includes(contentType as DocumentContentType);
}
