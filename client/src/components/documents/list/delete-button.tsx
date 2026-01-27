import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useDeleteDocument } from '@/hooks/useDeleteDocument';

const DeleteButton = ({ id }: { id: string }) => {
	const deleteMut = useDeleteDocument();

	const onContinue = async () => {
		await deleteMut.mutateAsync(id);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" disabled={deleteMut.isPending}>
					{deleteMut.isPending && (
						<Spinner data-icon="inline-start" />
					)}
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action will command to erase the target file. The
						deletion cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onContinue}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteButton;
