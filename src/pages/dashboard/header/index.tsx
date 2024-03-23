import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuGroup,
	DropdownMenuItem,
	Avatar,
	AvatarImage,
	AvatarFallback,
} from '@/components/ui';
import {useAppSelector} from '@/redux/hooks';
import {StateType} from '@/redux/root-reducer';
import {useLocation, useNavigate} from 'react-router-dom';

export const DashboardHeader = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {user} = useAppSelector((state: StateType) => state.users);
	const {data, errors, isLoading} = user;
	const handleMenuClick = (item: string) => {
		switch (item) {
			case 'profile':
				navigate('/dashboard/profile');
				break;
			case 'dashboard':
				navigate('/dashboard', {replace: true});
				break;
			case 'settings':
				navigate('/dashboard/settings');
				break;
			case 'log-out':
				navigate('/login');
				break;
			default:
		}
	};
	return (
		<div className="flex-none custom-shadow bg-white/10 backdrop-blur-lg flex m-2 mb-0 items-center">
			<div className="w-full p-4 flex items-center justify-between border-small rounded-small border-default-200">
				<h2 className="text-2xl font-bold">
					👋 Welcome,{' '}
					<span className="text-primary-500">
						{data?.firstName}
						{'	'}
						{data?.lastName}
					</span>
				</h2>
				{data && !errors && (
					<DropdownMenu>
						<DropdownMenuTrigger className="w-[14rem] cursor-pointer" asChild>
							<div className="py-1 px-5">
								<div
									className="flex items-center
								 justify-start gap-2"
								>
									<Avatar>
										<AvatarImage src={data?.avatarUrl} alt="Avatar" />
										<AvatarFallback className="border border-orange-500 bg-orange-500 text-white">
											{data?.firstName[0]}
											{data?.lastName[0]}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col justify-center gap-1">
										<span className="text-sm">
											{data?.firstName + ' ' + data?.lastName}
										</span>
										<span className="text-sm text-orange-500">
											{data?.role.toUpperCase()}
										</span>
									</div>
								</div>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => handleMenuClick('profile')}>
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem onAbort={() => handleMenuClick('dashboard')}>
									Dashboard
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleMenuClick('settings')}>
									Settings
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => handleMenuClick('log-out')}>
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	);
};
