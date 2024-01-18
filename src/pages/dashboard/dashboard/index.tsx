import React from 'react';
import {Card} from '@/components/ui';
import {FaChalkboardTeacher} from 'react-icons/fa';
import {FaMoneyBill1Wave, FaUserGroup} from 'react-icons/fa6';
import {CustomTable} from '../../../components/table';
import {cn} from '@/lib/utils';
// @ts-ignore
export const IconWrapper = ({children, className}) => (
	<div
		className={cn(
			className,
			'flex items-center rounded-full justify-center w-25 p-8 h-25 '
		)}
	>
		{children}
	</div>
);

export default function Dashboard() {
	return (
		<div className="flex  flex-col flex-grow p-3">
			<div className="grid dashboard-cards  grid-cols-3 gap-4 ">
				<Card className="p-5 bg-white/10 backdrop-blur-lg cursor-pointer shadow">
					<div className="grid justify-between grid-cols-2">
						<div className="col-span-1 w-full h-full flex items-center justify-start">
							<IconWrapper
								className="bg-primary-100 text-primary-500
                            border-primary-200 border-2"
							>
								<FaUserGroup size={30} />
							</IconWrapper>
						</div>
						<div className="col-span-1 flex flex-col justify-center items-end">
							<p className="text-sm text-left text-gray-400">
								Enrolled Students
							</p>
							<h1 className="text-2xl text-gray-500">1000</h1>
						</div>
					</div>
				</Card>
				<Card className="p-5 bg-white/10 backdrop-blur-lg cursor-pointer shadow">
					<div className="grid justify-between grid-cols-2">
						<div className="col-span-1 w-full h-full flex items-center justify-start">
							<IconWrapper
								className="bg-success-100 text-success-500
                            border-success-200 border-2"
							>
								<FaChalkboardTeacher size={30} />
							</IconWrapper>
						</div>
						<div className="col-span-1 flex flex-col justify-center items-end">
							<p className="text-sm text-left text-gray-400">Total Courses</p>
							<h1 className="text-2xl text-gray-500">56</h1>
						</div>
					</div>
				</Card>
				<Card className="p-5 bg-white/10 backdrop-blur-lg cursor-pointer shadow">
					<div className="grid justify-between grid-cols-2">
						<div className="col-span-1 w-full h-full flex items-center justify-start">
							<IconWrapper
								className="bg-pink-100 text-pink-500
                            border-pink-200 border-2"
							>
								<FaMoneyBill1Wave size={30} />
							</IconWrapper>
						</div>
						<div className="col-span-1 flex flex-col justify-center items-end">
							<p className="text-sm text-left text-gray-400">Total Balance</p>
							<h1 className="text-2xl text-gray-500">$402</h1>
						</div>
					</div>
				</Card>
			</div>
			<div className="dashboard-table mt-5">
				<CustomTable />
			</div>
		</div>
	);
}
