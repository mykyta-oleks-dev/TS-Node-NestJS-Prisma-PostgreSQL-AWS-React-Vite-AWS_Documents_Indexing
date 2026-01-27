import { useEmailStore } from '@/store/email.store';
import { useDocumentStatusChange } from './useDocumentStatusChange';
import { useEffect } from 'react';
import { API_URL } from '@/constants/env.constants';
import type { DocumentStatusEventData } from '@/types/events.types';

export const useDocumentsEvents = () => {
	const email = useEmailStore((s) => s.email);
	const mutation = useDocumentStatusChange();

	useEffect(() => {
		if (!email) return;

		const es = new EventSource(
			`${API_URL}/documents/events?email=${email}`,
			{
				withCredentials: false,
			},
		);

		es.onmessage = (event) => {
			const { id, status } = JSON.parse(
				event.data,
			) as DocumentStatusEventData;

			mutation.mutate({ id, status });
		};

		return () => {
			es.close();
		};
	}, [mutation, email]);
};
