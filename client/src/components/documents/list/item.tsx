import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from '@/components/ui/item';
import type { Document } from '@/types/document.types';

const ListItem = ({ item }: { item: Document }) => {
	return (
		<Item>
			<ItemContent>
				<ItemTitle>{item.filename}</ItemTitle>
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
			</ItemContent>
		</Item>
	);
};

export default ListItem;
