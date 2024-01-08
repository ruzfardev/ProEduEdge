import React, {FC, useEffect} from 'react';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	User,
} from '@nextui-org/react';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/images/logo-black.png';
import {useAppSelector} from '../../redux/hooks';
import {selectUser} from '../../redux/features/auth/userSlice';
export const Header: FC = () => {
	const user = useAppSelector(selectUser);
	useEffect(() => {
		console.log(user);
	}, [user]);
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
				<NavbarBrand className="flex h-[40px]  items-center gap-2">
					{/*<Image src={logo} alt="logo" />*/}
					ProEduEdge
				</NavbarBrand>
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
				{!(Object.keys(user).length === 0) ? (
					<Dropdown placement="bottom-start">
						<DropdownTrigger>
							<User
								as="button"
								avatarProps={{
									isBordered: true,
									src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
								}}
								className="transition-transform"
								description="@tonyreichert"
								name="Tony Reichert"
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="User Actions" variant="flat">
							<DropdownItem key="profile" className="h-14 gap-2">
								<p className="font-bold">Signed in as</p>
								<p className="font-bold">@tonyreichert</p>
							</DropdownItem>
							<DropdownItem key="settings">My Settings</DropdownItem>
							<DropdownItem key="team_settings">Team Settings</DropdownItem>
							<DropdownItem key="analytics">Analytics</DropdownItem>
							<DropdownItem key="system">System</DropdownItem>
							<DropdownItem key="configurations">Configurations</DropdownItem>
							<DropdownItem key="help_and_feedback">
								Help & Feedback
							</DropdownItem>
							<DropdownItem key="logout" color="danger">
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				) : (
					<>
						<NavbarItem className="hidden lg:flex">
							<Button
								color="warning"
								href="/register"
								variant="bordered"
								radius="full"
							>
								<NavLink to="/register">Be A Contributor</NavLink>
							</Button>
						</NavbarItem>
						<NavbarItem>
							<Button
								color="warning"
								className="text-white"
								href="/login"
								radius="full"
								variant="shadow"
							>
								{' '}
								<NavLink to="/login">Log In</NavLink>
							</Button>
						</NavbarItem>
					</>
				)}
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
