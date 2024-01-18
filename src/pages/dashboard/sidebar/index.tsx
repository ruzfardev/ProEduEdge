import {useLocation, useNavigate} from 'react-router';
import logo from '@/assets/images/logo-black.png';
import {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {cn} from '@/lib/utils';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	buttonVariants,
	Button,
} from '@/components/ui';
interface SidebarProps {
	isCollapsed: boolean;
	items: {
		sectionName: string;
		showDivider: boolean;
		children: {
			name: string;
			icon: JSX.Element;
			href: string;
			color: string;
		}[];
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
	const handleSidebarItemClick = (href: string) => {
		navigate(href);
	};
	return (
		<div
			data-collapsed={isCollapsed}
			className={cn(
				isCollapsed ? 'w-14' : 'w-1/6',
				'group flex bg-white/10 backdrop-blur-lg shadow-lg flex-col gap-4 py-2 px-1 data-[collapsed=true]:py-2 transition-width duration-300 ease-in-out'
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
				<div className="flex mb-auto justify-self-start mt-4 flex-col group-[[data-collapsed=true]]:items-center gap-2">
					{sidebarItems.map((item, index) =>
						isCollapsed
							? item.children.map((child, i) => {
									return (
										<Tooltip key={child.name} delayDuration={0}>
											<TooltipTrigger asChild>
												<Button
													onClick={() => handleSidebarItemClick(child.href)}
													key={child.name}
													className="w-10 h-10"
													variant={
														location.pathname === child.href
															? 'default'
															: 'ghost'
													}
												>
													<span>{child.icon}</span>
												</Button>
											</TooltipTrigger>
											<TooltipContent
												side="right"
												className="flex items-center gap-4"
											>
												{child.name}
											</TooltipContent>
										</Tooltip>
									);
							  })
							: item.children.map((child, i) => {
									return (
										<Button
											key={child.name}
											className="flex justify-start  h-10"
											variant={
												location.pathname === child.href ? 'default' : 'ghost'
											}
										>
											<Link
												className="flex items-center gap-3 w-full h-full justify-start"
												to={child.href}
											>
												{child.icon}
												{child.name}
											</Link>
										</Button>
									);
							  })
					)}
				</div>
				{children}
			</nav>
		</div>
	);
};
