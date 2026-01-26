import AuthDisplay from './auth';
import Search from './search';

const TopBar = () => {
	return (
		<div className="flex flex-col gap-3 border p-3 rounded-md">
			<AuthDisplay />
			<Search />
		</div>
	);
};

export default TopBar;
