import {useLocation, useNavigate} from 'react-router';
import logo from '@/assets/images/logo-black.png';
import {FC} from 'react';
import {Link} from 'react-router-dom';
import {cn} from '@/lib/utils';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	Button,
	Separator,
} from '@/components/ui';
import {useAppSelector} from '@/redux/hooks';
interface SidebarProps {
	isCollapsed: boolean;
	items: {
		name: string;
		user: string;
		icon: JSX.Element;
		href: string;
		color: string;
	}[];
	children?: React.ReactNode;
}
export const DashboardSidebar: FC<SidebarProps> = ({
	isCollapsed,
	items: sidebarItems,
	children,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const {data} = useAppSelector((state) => state.users.user);
	const handleSidebarItemClick = (href: string) => {
		navigate(href);
	};
	return (
		<div
			data-collapsed={isCollapsed}
			className={cn(
				isCollapsed ? 'w-14' : 'w-1/6',
				'group flex z-50 bg-white/10 backdrop-blur-lg custom-shadow flex-col gap-4 py-2 px-1 data-[collapsed=true]:py-2 transition-width duration-300 ease-in-out'
			)}
		>
			<nav className="flex flex-col h-full gap-1 group-[[data-collapsed=false]]:px-3">
				<div className="flex h-[40px] w-full  items-center gap-2">
					<strong className="sepia text-2xl font-bold">
						<Link to="/">
							<img src={logo} alt="logo" className="w-full sepia h-full" />
						</Link>
					</strong>
				</div>
				<Separator orientation="horizontal" />
				<div className="flex mb-auto justify-self-start mt-4 flex-col group-[[data-collapsed=true]]:items-center gap-2">
					{sidebarItems
						// .filter((s) => s.user === data?.role || s.user === '')
						.map((item, index) =>
							isCollapsed ? (
								<Tooltip key={item.name} delayDuration={0}>
									<TooltipTrigger asChild>
										<Button
											onClick={() => handleSidebarItemClick(item.href)}
											key={item.name}
											className="w-10 h-10"
											variant={
												location.pathname === item.href ? 'default' : 'ghost'
											}
										>
											<span>{item.icon}</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent
										side="right"
										className="flex items-center gap-4"
									>
										{item.name}
									</TooltipContent>
								</Tooltip>
							) : (
								<Button
									onClick={() => handleSidebarItemClick(item.href)}
									key={item.name}
									className="flex justify-start  h-10"
									variant={
										location.pathname === item.href ? 'default' : 'ghost'
									}
								>
									<Link
										className="flex items-center gap-3 w-full h-full justify-start"
										to={item.href}
									>
										{item.icon}
										{item.name}
									</Link>
								</Button>
							)
						)}
				</div>
				{children}
			</nav>
		</div>
	);
};
