import React, {useEffect} from 'react';
import {
	Button,
	Card,
	DropdownMenu,
	DropdownMenuTrigger,
	Input,
} from '@/components/ui';
import {FaChalkboardTeacher} from 'react-icons/fa';
import {FaMoneyBill1Wave, FaUserGroup} from 'react-icons/fa6';
import {CustomTable} from '@/components/table';
import {cn} from '@/lib/utils';
import {ChevronDownIcon} from '@radix-ui/react-icons';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {columns} from '@/pages/dashboard/dashboard/students';
import {getStudentsAction} from '@/redux/features/users/slice';
import {EChart} from '@/lib/chart/Echart';
import {getInstructorDashboardAction} from '@/redux/features/instructor/slice';
import {SubscribeDialog} from '@/pages/dashboard/student/dashboard/subscribe-dialog';
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
	const dispatch = useAppDispatch();
	const {
		students: {data, errors, isLoading},
	} = useAppSelector((state) => state.users);
	const {
		instructorDashboard: {data: stat, isLoading: statIsLoading},
	} = useAppSelector((state) => state.instructor);
	useEffect(() => {
		dispatch(getStudentsAction());
		dispatch(getInstructorDashboardAction());
	}, []);
	return (
		<div className="flex  flex-col flex-grow h-full">
			<div className="grid dashboard-cards  grid-cols-3 gap-4 ">
				<Card className="p-5 bg-white/10 backdrop-blur-lg cursor-pointer shadow">
					<div className="grid justify-between grid-cols-2">
						<div className="col-span-1 w-full h-full flex items-center justify-start">
							<IconWrapper
								className="bg-blue-300/70 text-blue-800
                            border-blue-500 border-2"
							>
								<FaUserGroup size={30} />
							</IconWrapper>
						</div>
						<div className="col-span-1 flex flex-col justify-center items-end">
							<p className="text-sm text-left text-gray-400">
								Enrolled Students
							</p>
							<h1 className="text-2xl text-gray-500">
								{statIsLoading ? 'Loading...' : stat?.totalEnrolledStudents}
							</h1>
						</div>
					</div>
				</Card>
				<Card className="p-5 bg-white/10 backdrop-blur-lg cursor-pointer shadow">
					<div className="grid justify-between grid-cols-2">
						<div className="col-span-1 w-full h-full flex items-center justify-start">
							<IconWrapper
								className="bg-green-300/70 text-green-500
                            border-green-500 border-2"
							>
								<FaChalkboardTeacher size={30} />
							</IconWrapper>
						</div>
						<div className="col-span-1 flex flex-col justify-center items-end">
							<p className="text-sm text-left text-gray-400">Total Courses</p>
							<h1 className="text-2xl text-gray-500">
								{statIsLoading ? 'Loading...' : stat?.totalCourses}
							</h1>
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
							<h1 className="text-2xl text-gray-500">
								$
								{statIsLoading ? (
									<span className="loader"></span>
								) : (
									stat?.totalBalance
								)}
							</h1>
						</div>
					</div>
				</Card>
			</div>
			<div className="dashboard-table mt-5 flex gap-4 h-full">
				<div className="w-8/12 rounded-md no-scrollbar overflow-scroll border">
					<CustomTable data={data} loading={isLoading} columns={columns} />
				</div>
				<SubscribeDialog />
			</div>
		</div>
	);
}
