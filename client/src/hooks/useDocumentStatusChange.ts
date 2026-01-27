import { useEmailStore } from '@/store/email.store';
import { type Document, type Status } from '@/types/document.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDocumentStatusChange = () => {
	const email = useEmailStore((s) => s.email);

	const qc = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, status }: { id: string; status: Status }) => {
			qc.setQueriesData<Document[]>(
				{ queryKey: ['documents', email], exact: false },
				(old = []) =>
					old.map((d) => {
						if (d.id !== id) return d;

						return {
							...d,
							status,
						};
					}),
			);
		},
	});
};
