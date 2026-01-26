import axios from 'axios';
import { axiosInstance } from '@/config/axios';
import type { DocumentContentType, Document } from '@/types/document.types';

export interface UploadUrlResponse {
	url: string;
	document: Document;
}

export const getUploadUrl = async (
	filename: string,
	contentType: DocumentContentType,
	email: string,
	size: number,
) => {
	const { data } = await axiosInstance.post<UploadUrlResponse>(
		'/documents/presigned-url',
		{ filename, contentType, email, size },
	);
	return data;
};

export const putFileToS3 = async (url: string, file: File) => {
	await axios.put(url, file, {
		headers: {
			'Content-Type': file.type,
		},
	});
};
