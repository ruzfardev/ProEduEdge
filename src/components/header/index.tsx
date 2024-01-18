import React, {FC, useEffect, useState} from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Button,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Card,
} from '@/components/ui';
import {Link, NavLink} from 'react-router-dom';
import logo from '../../assets/images/logo-black.png';
import {useAppSelector} from '../../redux/hooks';
import {selectUser} from '../../redux/features/auth/userSlice';
export const Header: FC = () => {
	const user = useAppSelector(selectUser);
	const [isScrolled, setIsScrolled] = useState(false);

	const handleScroll = () => {
		const offset = window.scrollY;
		const headerHeight = 100; // Replace with the actual height of your header
		if (offset > headerHeight) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
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
		<nav
			className={`py-3 z-50 nav w-full shadow-md mx-auto ${
				isScrolled ? 'nav-scrolled' : 'nav-top'
			}`}
		>
			<div className="w-8/12 flex items-center justify-between mx-auto">
				<div className="flex h-[40px] w-56  items-center gap-2">
					{/*<Image src={logo} alt="logo" />*/}
					<strong className="text-2xl font-bold">
						<Link to="/">
							<img src={logo} alt="logo" className="w-full h-full" />
						</Link>
					</strong>
				</div>
				<ul className="hidden sm:flex gap-4">
					<li>
						<NavLink
							className={({isActive}) =>
								isActive
									? 'text-black font-bold'
									: 'relative inline-flex items-center tap-highlight-transparent\n' +
									  '\t\t\t\t\t\toutline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2\n' +
									  '\t\t\t\t\t\tdata-[focus-visible=true]:outline-focus font-bold data-[focus-visible=true]:outline-offset-2\n' +
									  '\t\t\t\t\t\ttext-medium text-orange-400 no-underline hover:opacity-80 active:text-orange-400 active:opacity-disabled transition-opacity'
							}
							to={'/'}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({isActive}) =>
								isActive
									? 'text-black font-bold'
									: 'relative inline-flex items-center tap-highlight-transparent\n' +
									  '\t\t\t\t\t\toutline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2\n' +
									  '\t\t\t\t\t\tdata-[focus-visible=true]:outline-focus font-bold data-[focus-visible=true]:outline-offset-2\n' +
									  '\t\t\t\t\t\ttext-medium text-orange-400 no-underline hover:opacity-80 active:text-orange-400 active:opacity-disabled transition-opacity'
							}
							to={'/courses'}
						>
							Courses
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({isActive}) =>
								isActive
									? 'text-black font-bold'
									: 'relative inline-flex items-center tap-highlight-transparent\n' +
									  '\t\t\t\t\t\toutline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2\n' +
									  '\t\t\t\t\t\tdata-[focus-visible=true]:outline-focus font-bold data-[focus-visible=true]:outline-offset-2\n' +
									  '\t\t\t\t\t\ttext-medium text-orange-400 no-underline hover:opacity-80 active:text-orange-400 active:opacity-disabled transition-opacity'
							}
							to={'/about'}
						>
							About
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({isActive}) =>
								isActive
									? 'text-black font-bold'
									: 'relative inline-flex items-center tap-highlight-transparent\n' +
									  '\t\t\t\t\t\toutline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2\n' +
									  '\t\t\t\t\t\tdata-[focus-visible=true]:outline-focus font-bold data-[focus-visible=true]:outline-offset-2\n' +
									  '\t\t\t\t\t\ttext-medium text-orange-400 no-underline hover:opacity-80 active:text-orange-400 active:opacity-disabled transition-opacity'
							}
							to={'/contact'}
						>
							Contact
						</NavLink>
					</li>
				</ul>
				<div>
					{!(Object.keys(user).length === 0) ? (
						<DropdownMenu>
							<DropdownMenuTrigger className="w-[14rem] cursor-pointer" asChild>
								<div className="py-1 px-5">
									<div
										className="flex items-center
								 justify-start gap-2"
									>
										<Avatar>
											<AvatarImage
												src="https://i.pravatar.cc/500?img=32"
												alt="Avatar"
											/>
											<AvatarFallback></AvatarFallback>
										</Avatar>
										<div className="flex flex-col justify-center gap-1">
											<span className="text-sm">John Doe</span>
											<span className="text-sm text-orange-500">Intructor</span>
										</div>
									</div>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>Profile</DropdownMenuItem>
									<DropdownMenuItem>Dashboard</DropdownMenuItem>
									<DropdownMenuItem>Settings</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Log out</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<>
							<Button
								variant="outline"
								className="border text-orange-500 mr-3	hover:text-white hover:bg-orange-500 border-orange-500"
							>
								<NavLink to="/register">Be A Contributor</NavLink>
							</Button>
							<Button>
								<NavLink to="/login">Log In</NavLink>
							</Button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
