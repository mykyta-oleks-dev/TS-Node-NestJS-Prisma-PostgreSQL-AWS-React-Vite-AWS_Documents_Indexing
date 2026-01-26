import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';
import { useSearchStore } from '@/store/search.store';
import { CircleXIcon, SearchIcon } from 'lucide-react';
import { useState, type FormEvent } from 'react';

const Search = () => {
	const [value, setValue] = useState('');
	const setSearch = useSearchStore((s) => s.setSearch);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		setSearch(value);
	};

	return (
		<form onSubmit={onSubmit}>
			<InputGroup>
				<InputGroupInput
					onChange={(e) => setValue(e.target.value)}
					name="search"
					placeholder="Search"
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton type="reset">
						<CircleXIcon />
					</InputGroupButton>
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					<InputGroupButton type="submit">
						<SearchIcon />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</form>
	);
};

export default Search;
