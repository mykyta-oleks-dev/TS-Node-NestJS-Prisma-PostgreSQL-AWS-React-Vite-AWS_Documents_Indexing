import { useEmailStore } from '@/store/email.store';
import { useSearchStore } from '@/store/search.store';
import { useQueryClient } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';

export const useDocumentsSearch = () => {
	const [value, setValue] = useState('');
	const email = useEmailStore((s) => s.email);
	const setSearch = useSearchStore((s) => s.setSearch);

	const qc = useQueryClient();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		const trimmed = value.trim();
		const newSearch = trimmed === '' ? undefined : trimmed;

		setSearch(newSearch);
		setValue(trimmed);

		qc.invalidateQueries({ queryKey: ['documents', email, newSearch] });
	};

	const onReset = () => {
		setSearch(undefined);
		setValue('');
	};

	return { value, setValue, onSubmit, onReset };
};
