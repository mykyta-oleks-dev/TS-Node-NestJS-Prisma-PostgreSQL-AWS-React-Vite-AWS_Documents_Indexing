import { create } from 'zustand';

type SearchStore = {
	search: string | undefined;
	setSearch: (search: string | undefined) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
	search: undefined,
	setSearch: (search) => set({ search }),
}));
