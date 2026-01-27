import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUploadUrl, putFileToS3 } from '@/api/documents.api';
import {
	type Document,
	type DocumentContentType,
} from '@/types/document.types';
import { validateFile } from '@/lib/validation';
import { useEmailStore } from '@/store/email.store';
import { useSearchStore } from '@/store/search.store';
import { toast } from 'sonner';

export function useUploadDocument() {
	const email = useEmailStore((s) => s.email);
	const search = useSearchStore((s) => s.search);

	const qc = useQueryClient();

	const key = ['documents', email, search];

	return useMutation({
		mutationFn: async (file: File) => {
			if (!validateFile(file) || !email) return;

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

			const prev = qc.getQueryData<Document[]>(key);

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

			qc.setQueryData<Document[]>(key, (old = []) => [
				optimisticDoc,
				...old,
			]);

			return { prev };
		},

		onError: (_err, _file, ctx) => {
			if (ctx?.prev) {
				qc.setQueryData(key, ctx.prev);
			}

			toast.error(
				'There was an error during the upload process. Please try again later.',
			);
		},

		onSettled: () => {
			// server is source of truth
			qc.invalidateQueries({ queryKey: ['documents'] });

			toast.success('The document is successfuly uploaded and saved!');
		},
	});
}
