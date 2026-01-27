import { Spinner } from '@/components/ui/spinner';
import { useDocuments } from '@/hooks/useDocumentsQuery';
import ListItem from './item';

const DocumentsList = () => {
	const { data, error, isFetching } = useDocuments();

	if (error) return <p>Error! {error.message}</p>;

	return (
		<div className="flex flex-col gap-3 border rounded-md">
			{isFetching && <Spinner className="mx-auto size-10 my-3" />}
			{!isFetching && data && data?.length > 0 && (
				<ul className="p-3 flex flex-col gap-3">
					{data.map((d) => (
						<ListItem item={d} key={d.id} />
					))}
				</ul>
			)}
			{!isFetching && !data?.length && (
				<p className="m-3 text-center">No documents found</p>
			)}
		</div>
	);
};

export default DocumentsList;
