import {FC} from 'react';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Chip,
	Image,
} from '@nextui-org/react';

interface Props {
	id: number;
	title: string;
	banner: string;
	price: number;
	badge: string;
	onCardClick: Function;
}
export const PCard: FC<Props> = (props) => {
	const {onCardClick, id, title, price, banner, badge} = props;
	return (
		<Card
			shadow="md"
			className="bg-yellow-500 text-white h-[250px]"
			key={id}
			isPressable
			radius="md"
			isFooterBlurred
			isBlurred={true}
			onPress={() => onCardClick(id)}
		>
			<CardHeader className="absolute z-40 top-1 flex-col items-start">
				<Chip className="capitalize" color="warning" size="sm" variant="shadow">
					{badge}
				</Chip>
				{/*<p className="text-tiny text-yellow-500 uppercase font-bold">{badge}</p>*/}
			</CardHeader>
			<CardBody className="overflow-visible p-0">
				<Image
					shadow="sm"
					radius="none"
					width="100%"
					alt={title}
					className="w-full object-cover h-[200px]"
					src={banner}
				/>
			</CardBody>
			<CardFooter className="text-small justify-between">
				<b className="float-left truncate w-9/12 ">{title}</b>
				<Button
					className="text-tiny text-white hover:text-gray-700"
					variant="ghost"
					radius="full"
					size="sm"
				>
					{price} $
				</Button>
			</CardFooter>
		</Card>
	);
};
