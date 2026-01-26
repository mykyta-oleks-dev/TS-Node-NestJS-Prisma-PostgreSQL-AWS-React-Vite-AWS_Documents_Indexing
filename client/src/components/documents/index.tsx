import DocumentsList from './list';
import TopBar from './top-bar';

const UserDocuments = () => {
	return (
		<div className="w-full h-full flex flex-col gap-3">
			<TopBar />
			<DocumentsList />
		</div>
	);
};

export default UserDocuments;
