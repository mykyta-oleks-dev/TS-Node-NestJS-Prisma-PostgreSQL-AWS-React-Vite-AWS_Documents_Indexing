import { deleteFile } from '@/api/documents.api';
import { useEmailStore } from '@/store/email.store';
import { useSearchStore } from '@/store/search.store';
import { type Document } from '@/types/document.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteDocument() {
	const email = useEmailStore((s) => s.email);
	const search = useSearchStore((s) => s.search);

	const qc = useQueryClient();

	const key = ['documents', email, search];

	return useMutation({
		mutationFn: async (id: string) => {
			await deleteFile(id);
		},

		onMutate: async (id) => {
			await qc.cancelQueries({ queryKey: ['documents'] });

			const prev = qc.getQueryData<Document[]>(key);

			qc.setQueryData<Document[]>(key, (old = []) =>
				old.filter((d) => d.id !== id),
			);

			return { prev };
		},

		onError: (_err, _file, ctx) => {
			if (ctx?.prev) {
				qc.setQueryData(key, ctx.prev);
			}

			toast.error(
				'There was an error during the delete process. Please try again later.',
			);
		},

		onSettled: () => {
			toast.success('The file was deleted successfuly!');
		},
	});
}
