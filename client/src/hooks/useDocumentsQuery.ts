import { getDocuments } from '@/api/documents.api';
import { useEmailStore } from '@/store/email.store';
import { useSearchStore } from '@/store/search.store';
import { convertDBDocument } from '@/types/document.types';
import { useQuery } from '@tanstack/react-query';

export const useDocuments = () => {
	const email = useEmailStore((s) => s.email);
	const search = useSearchStore((s) => s.search);

	return useQuery({
		queryKey: ['documents', email, search],
		queryFn: async () => {
			if (!email) return;

			const data = await getDocuments(search);

			return data.map((d) => convertDBDocument(d));
		},
	});
};
