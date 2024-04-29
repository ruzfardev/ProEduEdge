import img from '../../../../../assets/images/Account-amico.svg';
import {Button, Card} from '@/components/ui';
import {FC} from 'react';

interface Props {
	width?: string;
}

export const SubscribeDialog: FC<Props> = (props) => {
	return (
		<>
			<div className="w-4/12 h-full">
				<Card
					className="bg-transparent flex flex-col
				 justify-start items-center
				 p-2 px-3 py-6 h-full"
				>
					<img
						src={img}
						className={`${props.width ? props.width : 'w-9/12'} object-cover pulse`}
						alt="Course image"
					/>
					<h2 className="font-semibold text-lg text-orange-500 text-center">
						{' '}
						Want more features?
					</h2>
					<p className="text-sm text-gray-500 text-center">
						Subscribe to get access to more features
					</p>
					<div className="flex flex-col gap-4 justify-center items-center w-full">
						<Button className="mt-6 py-6 font-bold rounded-full w-6/12">
							Subscribe
						</Button>
					</div>
				</Card>
			</div>
		</>
	);
};
