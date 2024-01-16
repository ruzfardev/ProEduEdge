import {
	BreadcrumbItem,
	Breadcrumbs,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	User,
} from '@nextui-org/react';
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
			const breadcrumbItem = (
				<BreadcrumbItem
					onPress={() => handleClick(pathToCrumb)}
					className="capitalize"
					key={index}
				>
					{crumb}
				</BreadcrumbItem>
			);

			// Add the breadcrumb item to the accumulator
			return [...acc, breadcrumbItem];
		}, []);

	return (
		<div className="flex-none flex items-center p-2">
			<div className="w-full p-4 flex items-center justify-between border-small rounded-small bg-slate-50 border-default-200 dark:border-default-100">
				{crumbs.length > 0 && (
					<Breadcrumbs key="breadcrumbs">{crumbs}</Breadcrumbs>
				)}
				<Dropdown className="ml-auto" placement="bottom-start">
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
						<DropdownItem key="back-to-site">
							<Link href="/">Back to Site</Link>
						</DropdownItem>
						<DropdownItem key="logout" color="danger">
							Log Out
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
};
