import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUploadUrl, putFileToS3 } from '@/api/documents.api';
import {
	type Document,
	type DocumentContentType,
} from '@/types/document.types';
import { validateFile } from '@/lib/validation';
import { useEmailStore } from '@/store/email.store';

export function useUploadDocument() {
	const email = useEmailStore((s) => s.email);

	const qc = useQueryClient();

	return useMutation({
		mutationFn: async (file: File) => {
			if (!validateFile(file) || !email) return;

			console.log({ file });

			const { url, document } = await getUploadUrl(
				file.name,
				file.type as DocumentContentType,
				email,
				file.size,
			);

			await putFileToS3(url, file);

			return document;
		},

		onMutate: async (file) => {
			if (!email) return;

			await qc.cancelQueries({ queryKey: ['documents'] });

			const prev = qc.getQueryData<Document[]>(['documents']);

			// optimistic document
			const optimisticDoc: Document = {
				id: crypto.randomUUID(),
				userEmail: email,
				filename: file.name,
				key: 'pending',
				mimeType: file.type as DocumentContentType,
				status: 'pending',
				highlights: undefined,
				uploadedAt: new Date(),
			};

			qc.setQueryData<Document[]>(['documents', email], (old = []) => [
				optimisticDoc,
				...old,
			]);

			return { prev };
		},

		onError: (_err, _file, ctx) => {
			if (ctx?.prev) {
				qc.setQueryData(['documents', email], ctx.prev);
			}
		},

		onSettled: () => {
			// server is source of truth
			qc.invalidateQueries({ queryKey: ['documents'] });
		},
	});
}
