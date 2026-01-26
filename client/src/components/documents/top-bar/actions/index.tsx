import Search from './search';
import UploadButton from './upload';

const Actions = () => {
	return (
		<div className="flex w-full gap-3">
			<Search />
			<UploadButton />
		</div>
	);
};

export default Actions;
