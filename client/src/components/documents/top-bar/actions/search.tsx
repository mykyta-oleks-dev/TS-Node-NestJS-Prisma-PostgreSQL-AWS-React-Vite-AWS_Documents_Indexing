import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';
import { useDocumentsSearch } from '@/hooks/useDocumentsSearch';
import { CircleXIcon, SearchIcon } from 'lucide-react';

const Search = () => {
	const { onSubmit, onReset, value, setValue } = useDocumentsSearch();

	return (
		<form onSubmit={onSubmit} onReset={onReset} className="flex-1">
			<InputGroup>
				<InputGroupInput
					onChange={(e) => setValue(e.target.value)}
					value={value}
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
