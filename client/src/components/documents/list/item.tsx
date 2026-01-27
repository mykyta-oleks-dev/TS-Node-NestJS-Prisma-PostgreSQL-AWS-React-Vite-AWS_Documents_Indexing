import { Badge } from '@/components/ui/badge';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from '@/components/ui/item';
import type { Document, Status } from '@/types/document.types';
import DeleteButton from './delete-button';
import Highlights from './highlights';

const ListItem = ({ item }: { item: Document }) => {
	const badgeClasses = getClasses(item.status);

	return (
		<Item variant="outline">
			<ItemContent>
				<ItemTitle>
					{item.filename}{' '}
					<Badge className={badgeClasses}>{item.status}</Badge>
				</ItemTitle>
				<ItemDescription>
					{item.uploadedAt.toLocaleString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
					})}
				</ItemDescription>
				{item.highlights?.textContent && (
					<Highlights highlights={item.highlights.textContent} />
				)}
			</ItemContent>
			<ItemActions>
				<DeleteButton id={item.id} />
			</ItemActions>
		</Item>
	);
};

function getClasses(status: Status) {
	switch (status) {
		case 'error':
			return 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300';
		case 'pending':
			return 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
		default:
			return 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300';
	}
}

export default ListItem;
