import { deleteFile } from '@/api/documents.api';
import { useEmailStore } from '@/store/email.store';
import { type Document } from '@/types/document.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteDocument() {
	const email = useEmailStore((s) => s.email);

	const qc = useQueryClient();

	const queryKey = ['documents', email];

	return useMutation({
		mutationFn: async (id: string) => {
			await deleteFile(id);
		},

		onMutate: async (id) => {
			await qc.cancelQueries({ queryKey });

			const prev = qc.getQueriesData<Document[]>({
				queryKey,
				exact: false,
			});

			qc.setQueriesData<Document[]>(
				{
					queryKey,
					exact: false,
				},
				(old = []) => old.filter((d) => d.id !== id),
			);

			return { prev };
		},

		onError: (_err, _file, ctx) => {
			ctx?.prev.forEach(([key, data]) => {
				qc.setQueryData(key, data);
			});

			toast.error(
				'There was an error during the delete process. Please try again later.',
			);
		},

		onSettled: () => {
			toast.success('The file was deleted successfuly!');
		},
	});
}
