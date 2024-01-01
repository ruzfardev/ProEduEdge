import React, {FC} from 'react';
import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@nextui-org/react';
import {NavLink} from 'react-router-dom';

export const Header: FC = () => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const menuItems = [
		'Profile',
		'Dashboard',
		'Activity',
		'Analytics',
		'System',
		'Deployments',
		'My Settings',
		'Team Settings',
		'Help & Feedback',
		'Log Out',
	];
	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className="sm:hidden"
				/>
				<NavbarBrand>PROEDUEDGE </NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<NavLink
						className={({isActive}) =>
							isActive
								? 'text-black font-bold'
								: 'relative inline-flex items-center tap-highlight-transparent\n' +
								  '\t\t\t\t\t\toutline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2\n' +
								  '\t\t\t\t\t\tdata-[focus-visible=true]:outline-focus font-bold data-[focus-visible=true]:outline-offset-2\n' +
								  '\t\t\t\t\t\ttext-medium text-amber-400 no-underline hover:opacity-80 active:text-amber-400 active:opacity-disabled transition-opacity'
						}
						to={'/'}
					>
						Home
					</NavLink>
				</NavbarItem>
				<NavbarItem>
					<NavLink
						className={({isActive}) =>
							isActive
								? 'text-black font-bold'
								: 'relative inline-flex items-center tap-highlight-transparent\n' +
								  '\t\t\t\t\t\toutline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2\n' +
								  '\t\t\t\t\t\tdata-[focus-visible=true]:outline-focus font-bold data-[focus-visible=true]:outline-offset-2\n' +
								  '\t\t\t\t\t\ttext-medium text-amber-400 no-underline hover:opacity-80 active:text-amber-400 active:opacity-disabled transition-opacity'
						}
						to={'/courses'}
					>
						Courses
					</NavLink>
				</NavbarItem>
				<NavbarItem>
					<NavLink
						className={({isActive}) =>
							isActive
								? 'text-black font-bold'
								: 'relative inline-flex items-center tap-highlight-transparent\n' +
								  '\t\t\t\t\t\toutline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2\n' +
								  '\t\t\t\t\t\tdata-[focus-visible=true]:outline-focus font-bold data-[focus-visible=true]:outline-offset-2\n' +
								  '\t\t\t\t\t\ttext-medium text-amber-400 no-underline hover:opacity-80 active:text-amber-400 active:opacity-disabled transition-opacity'
						}
						to={'/about'}
					>
						About
					</NavLink>
				</NavbarItem>
				<NavbarItem>
					<NavLink
						className={({isActive}) =>
							isActive
								? 'text-black font-bold'
								: 'relative inline-flex items-center tap-highlight-transparent\n' +
								  '\t\t\t\t\t\toutline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2\n' +
								  '\t\t\t\t\t\tdata-[focus-visible=true]:outline-focus font-bold data-[focus-visible=true]:outline-offset-2\n' +
								  '\t\t\t\t\t\ttext-medium text-amber-400 no-underline hover:opacity-80 active:text-amber-400 active:opacity-disabled transition-opacity'
						}
						to={'/contact'}
					>
						Contact
					</NavLink>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Button
						as={Link}
						color="warning"
						href="/register"
						variant="bordered"
						radius="full"
					>
						Be A Contributor
					</Button>
				</NavbarItem>
				<NavbarItem>
					<Button
						as={Link}
						color="warning"
						className="text-white"
						href="/login"
						radius="full"
					>
						Log In
					</Button>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={
								index === 2
									? 'warning'
									: index === menuItems.length - 1
									? 'danger'
									: 'warning'
							}
							className="w-full"
							href="#"
							size="lg"
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};
