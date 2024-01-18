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
import {useState} from 'react';
import {Button} from '@/components/ui';
import {cn} from '@/lib/utils';

const sidebarItems = [
	{
		sectionName: 'Main',
		showDivider: false,
		children: [
			{
				name: 'Dashboard',
				icon: <CubeIcon />,
				href: '/dashboard',
				color: 'warning',
			},
			{
				name: 'Profile',
				icon: <PersonIcon />,
				href: '/dashboard/profile',
				color: 'warning',
			},
		],
	},
	{
		sectionName: 'Management',
		showDivider: false,
		children: [
			{
				name: 'Students',
				icon: <FaUsers />,
				href: '/dashboard/students',
				color: 'warning',
			},
			{
				name: 'Courses',
				icon: <FaChalkboardTeacher />,
				href: '/dashboard/courses',
				color: 'warning',
			},
			{
				name: 'Categories',
				icon: <CardStackIcon />,
				href: '/dashboard/categories',
				color: 'warning',
			},
		],
	},
	{
		sectionName: 'Settings',
		showDivider: false,
		children: [
			{
				name: 'Settings',
				icon: <GearIcon />,
				href: '/dashboard/settings',
				color: 'warning',
			},
		],
	},

	{
		sectionName: 'Media',
		showDivider: true,
		children: [
			{
				name: 'Discussions',
				icon: <ChatBubbleIcon />,
				href: '/dashboard/discussions',
				color: 'warning',
			},
			{
				name: 'Live Streams',
				icon: <VideoIcon />,
				href: '/dashboard/live-streams',
				color: 'warning',
			},
		],
	},
	{
		sectionName: 'Logout',
		showDivider: false,
		children: [
			{
				name: 'Logout',
				icon: <ExitIcon />,
				href: '/',
				color: 'danger',
			},
		],
	},
];
export const DashboardRoot = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<main className="relative flex h-screen">
			<div className="absolute w-full h-full custom-gradient"></div>
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
						{!isCollapsed ? <DoubleArrowLeftIcon /> : <DoubleArrowRightIcon />}
					</Button>
				</DashboardSidebar>
				<div className="flex flex-col flex-grow">
					<DashboardHeader />

					<div className="flex-grow p-2">
						<div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-small p-2 h-full">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};
