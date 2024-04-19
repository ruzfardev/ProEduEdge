import React, {FC} from 'react';
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from '@/components/ui';

interface ConfirmationDialogProps {
	onConfirm: () => void;
	title: string;
	description?: string;
	trigger: React.ReactNode;
}
export const ConfirmationDialog: FC<ConfirmationDialogProps> = (props) => {
	const {onConfirm, title, description, trigger} = props;
	return (
		<Dialog>
			{trigger}
			<DialogContent>
				<DialogHeader>{title}</DialogHeader>
				{description && <p>{description}</p>}
				<DialogFooter>
					<DialogClose asChild>
						<Button className="mr-2" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button onClick={onConfirm}>Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
