import {Button, Card} from '@/components/ui';
import {RocketIcon} from '@radix-ui/react-icons';

export const UpcomingAssignments = () => {
	return (
		<div className="w-4/12 h-full">
			<div className="flex flex-col gap-4 h-full">
				<Card className="bg-transparent flex flex-col p-2 px-3 h-full">
					<div className="flex justify-between items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
						<div className="flex flex-col justify-between items-center">
							<h2 className="font-semibold text-lg">Assignment 1</h2>
							<p className="text-sm text-gray-500">Due on: 12/12/2021</p>
						</div>
						<Button variant="outline" className="text-orange-500 font-bold">
							Details
						</Button>
					</div>
					<div className="flex justify-between items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
						<div className="flex flex-col justify-between items-center">
							<h2 className="font-semibold text-lg">Assignment 1</h2>
							<p className="text-sm text-gray-500">Due on: 12/12/2021</p>
						</div>
						<Button variant="outline" className="text-orange-500 font-bold">
							Details
						</Button>
					</div>
					<div className="flex justify-between items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
						<div className="flex flex-col justify-between items-center">
							<h2 className="font-semibold text-lg">Assignment 1</h2>
							<p className="text-sm text-gray-500">Due on: 12/12/2021</p>
						</div>
						<Button variant="outline" className="text-orange-500 font-bold">
							Details
						</Button>
					</div>
					<div className="flex justify-between items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
						<div className="flex flex-col justify-between items-center">
							<h2 className="font-semibold text-lg">Assignment 1</h2>
							<p className="text-sm text-gray-500">Due on: 12/12/2021</p>
						</div>
						<Button variant="outline" className="text-orange-500 font-bold">
							Details
						</Button>
					</div>
					<div className="flex justify-between items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
						<div className="flex flex-col justify-between items-center">
							<h2 className="font-semibold text-lg">Assignment 1</h2>
							<p className="text-sm text-gray-500">Due on: 12/12/2021</p>
						</div>
						<Button variant="outline" className="text-orange-500 font-bold">
							Details
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
};
