import {Button} from '@nextui-org/react';
import {
	FaRegComment,
	FaRegUser,
	FaUsers,
	FaChalkboardTeacher,
	FaCogs,
	FaReply,
} from 'react-icons/fa';
import {useLocation, useNavigate} from 'react-router';
import {FaDiceD6, FaVideo} from 'react-icons/fa6';
import {useState} from 'react';
export const ListboxWrapper = ({children}) => (
	<div className="w-100 h-full border-small px-1 py-2 rounded-small bg-slate-50 border-default-200 dark:border-default-100">
		{children}
	</div>
);

const sidebarItems = [
	{
		sectionName: 'Main',
		showDivider: false,
		children: [
			{
				name: 'Dashboard',
				icon: <FaDiceD6 />,
				href: '/dashboard',
				color: 'warning',
			},
			{
				name: 'Profile',
				icon: <FaRegUser />,
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
				// icon: <MdOutlineCategory />,
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
				icon: <FaCogs />,
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
				icon: <FaRegComment />,
				href: '/dashboard/discussions',
				color: 'warning',
			},
			{
				name: 'Live Streams',
				icon: <FaVideo />,
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
				icon: <FaReply />,
				href: '/logout',
				color: 'danger',
			},
		],
	},
];
export const DashboardSidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [activePage, setActivePage] = useState(['Dashboard']);
	const handleSidebarItemClick = (href: string, name: string) => {
		navigate(href);
		setActivePage([name]);
	};
	return (
		<div className=" w-64 h-full flex flex-col p-2">
			<ListboxWrapper>
				<div className="flex flex-col items-center justify-center">
					{sidebarItems.map((item, index) => {
						return (
							<div
								className="flex flex-col items-center w-full p-2"
								key={index}
							>
								<div className="text-tiny w-full text-left text-gray-400">
									{item.sectionName}
								</div>
								{item.children.map((child, i) => {
									return (
										<Button
											variant="light"
											color={child.color}
											key={child.name}
											className={`${
												location.pathname === child.href
													? 'text-amber-400'
													: 'text-gray-800'
											}  w-full  justify-start mb-1 hover:text-amber-400 hover:bg-amber-50`}
											startContent={child.icon}
											data-hover={location.pathname === child.href}
											onClick={() =>
												handleSidebarItemClick(child.href, child.name)
											}
										>
											{child.name}
										</Button>
									);
								})}
							</div>
						);
					})}
				</div>
			</ListboxWrapper>
		</div>
	);
};
