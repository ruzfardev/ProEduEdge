import {Outlet} from 'react-router';
import {DashboardHeader} from './header';
import {DashboardSidebar} from './sidebar';

import {
	CardStackIcon,
	ChatBubbleIcon,
	CubeIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
	ExitIcon,
	GearIcon,
	PersonIcon,
	VideoIcon,
} from '@radix-ui/react-icons';
import {FaChalkboardTeacher, FaUsers} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui';
import {LocalStorageManager, cn} from '@/lib/utils';
import {Toaster} from 'sonner';
import {useAppDispatch} from '@/redux/hooks';
import {getCategoriesAction} from '@/redux/features/course/slice';
import {UserType} from '@/redux/features/users/types';
import {loginUserSuccessAction} from '@/redux/features/users/slice';
import {SectionMediaProvider} from '@/context';

const sidebarItems = [
	{
		name: 'Dashboard',
		user: 'teacher',
		icon: <CubeIcon />,
		href: '/dashboard',
		color: 'warning',
	},
	{
		name: 'Dashboard',
		user: 'student',
		icon: <CubeIcon />,
		href: '/dashboard/me',
		color: 'warning',
	},
	{
		name: 'Profile',
		user: '',
		icon: <PersonIcon />,
		href: '/dashboard/profile',
		color: 'warning',
	},
	{
		name: 'Students',
		user: 'teacher',
		icon: <FaUsers />,
		href: '/dashboard/students',
		color: 'warning',
	},
	{
		name: 'Courses',
		user: 'teacher',
		icon: <FaChalkboardTeacher />,
		href: '/dashboard/courses',
		color: 'warning',
	},
	{
		name: 'My Courses',
		user: 'student',
		icon: <FaChalkboardTeacher />,
		href: '/dashboard/my-courses',
		color: 'warning',
	},
	{
		name: 'Categories',
		user: 'teacher',
		icon: <CardStackIcon />,
		href: '/dashboard/categories',
		color: 'warning',
	},
	{
		name: 'Settings',
		user: '',
		icon: <GearIcon />,
		href: '/dashboard/settings',
		color: 'warning',
	},
	{
		name: 'Discussions',
		user: '',
		icon: <ChatBubbleIcon />,
		href: '/dashboard/discussions',
		color: 'warning',
	},
	{
		name: 'Live Streams',
		user: '',
		icon: <VideoIcon />,
		href: '/dashboard/livestream',
		color: 'warning',
	},
	{
		name: 'Logout',
		user: '',
		icon: <ExitIcon />,
		href: '/login',
		color: 'danger',
	},
];
export const DashboardRoot = () => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const dispatch = useAppDispatch();
	const l = LocalStorageManager.getInstance();
	useEffect(() => {
		if (l.getItem('user')) {
			const user: UserType =
				l.getItem('user') !== '' ? l.getItem('user') : null;
			dispatch(loginUserSuccessAction(user));
		}
		dispatch(getCategoriesAction());
	}, [dispatch]);
	return (
		<main className="relative flex h-screen">
			<SectionMediaProvider>
				<Toaster richColors expand position="top-right" />
				<div className="absolute w-full h-full custom-gradient custom-gradient-1"></div>
				<div className="flex flex-row flex-nowrap h-full w-full">
					<DashboardSidebar items={sidebarItems} isCollapsed={isCollapsed}>
						<Button
							onClick={() => setIsCollapsed(!isCollapsed)}
							className={cn(
								'flex mt-auto',
								'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
							)}
							variant="ghost"
						>
							{!isCollapsed ? (
								<DoubleArrowLeftIcon />
							) : (
								<DoubleArrowRightIcon />
							)}
						</Button>
					</DashboardSidebar>
					<div className="flex flex-col z-40 flex-grow">
						<DashboardHeader />

						<div className="flex-grow p-2">
							<div className="bg-white/10 backdrop-blur-lg custom-shadow rounded-small p-5 h-full">
								<Outlet />
							</div>
						</div>
					</div>
				</div>
			</SectionMediaProvider>
		</main>
	);
};
