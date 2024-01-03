import {FC, useState} from 'react';
import {Button} from '@nextui-org/react';

interface ShowMoreTextProps {
	text: string;
	maxLength: number;
	className?: string;
}
export const ShowMoreText: FC<ShowMoreTextProps> = ({
	text,
	maxLength,
	className,
}) => {
	const [isShown, setIsShown] = useState(false);
	const [textShown, setTextShown] = useState(text.slice(0, maxLength) + '...');

	const toggleIsShown = () => {
		if (!isShown) {
			setTextShown(text);
			setIsShown(true);
		} else {
			setTextShown(text.slice(0, maxLength) + '...');
			setIsShown(false);
		}
	};

	return (
		<div>
			<p className={className}>{textShown}</p>
			<Button variant="light" onClick={toggleIsShown}>
				{isShown ? 'Show Less' : 'Show More'}
			</Button>
		</div>
	);
};
