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
import {useLocation, useNavigate} from 'react-router-dom'; // Ensure you import from 'react-router-dom'

export const DashboardHeader = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleClick = (path: string) => {
		navigate(path);
	};

	// Initialize the crumbs array
	const crumbs = location.pathname
		.split('/')
		.filter((crumb) => crumb !== '')
		// @ts-ignore
		.reduce((acc, crumb, index, array) => {
			// Construct the full path for the current breadcrumb
			const pathToCrumb = `/${array.slice(0, index + 1).join('/')}`;

			// Create the breadcrumb item
			// const breadcrumbItem = (
			// <BreadcrumbItem
			// 	onPress={() => handleClick(pathToCrumb)}
			// 	className="capitalize"
			// 	key={index}
			// >
			// 	{crumb}
			// </BreadcrumbItem>
			// );

			// Add the breadcrumb item to the accumulator
			return [...acc];
		}, []);

	return (
		<div className="flex-none bg-white/10 backdrop-blur-lg flex m-2 mb-0 items-center">
			<div className="w-full p-4 flex items-center shadow-md justify-between border-small rounded-small border-default-200 dark:border-default-100">
				<DropdownMenu>
					<DropdownMenuTrigger
						className="w-[14rem] ml-auto cursor-pointer"
						asChild
					>
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
									<AvatarFallback>JD</AvatarFallback>
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
			</div>
		</div>
	);
};
