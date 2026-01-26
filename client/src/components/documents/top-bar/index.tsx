import AuthDisplay from './auth';
import Actions from './actions';
import { Separator } from '@/components/ui/separator';

const TopBar = () => {
	return (
		<div className="flex flex-col gap-3 border p-3 rounded-md">
			<AuthDisplay />
			<Separator />
			<Actions />
		</div>
	);
};

export default TopBar;
