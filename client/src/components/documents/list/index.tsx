import { Spinner } from '@/components/ui/spinner';
import { useDocuments } from '@/hooks/useDocumentsQuery';
import ListItem from './item';

const DocumentsList = () => {
	const { data, error, isPending } = useDocuments();

	console.log({ data });

	if (error) return <p>Error! {error.message}</p>;

	return (
		<div className="flex flex-col gap-3 border rounded-md">
			{isPending && <Spinner className="mx-auto size-10" />}
			{!isPending && data && (
				<ul>
					{data.map((d) => (
						<ListItem item={d} key={d.id} />
					))}
				</ul>
			)}
		</div>
	);
};

export default DocumentsList;
