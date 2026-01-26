import { axiosInstance } from '@/config/axios';
import { useEmailStore } from '@/store/email.store';
import { useSearchStore } from '@/store/search.store';
import { convertDBDocument, type DBDocument } from '@/types/document.types';
import { useQuery } from '@tanstack/react-query';

export const useDocuments = () => {
	const email = useEmailStore((s) => s.email);
	const search = useSearchStore((s) => s.search);

	return useQuery({
		queryKey: ['documents', email, search],
		queryFn: async () => {
			if (!email) return;

			const res = await axiosInstance.get<DBDocument[]>('/documents');

			return res.data.map((d) => convertDBDocument(d));
		},
	});
};
