import {Outlet} from 'react-router';
import {DashboardHeader} from './header';
import {DashboardSidebar} from './sidebar';

export const DashboardRoot = () => {
	return (
		<main className="flex h-screen bg-gray-200">
			<div className="flex flex-row flex-nowrap h-full w-full">
				<DashboardSidebar />

				<div className="flex flex-col flex-grow">
					<DashboardHeader />

					<div className="flex-grow p-2">
						<div className="border-small rounded-small bg-slate-50 border-default-200 dark:border-default-100 p-2 h-full">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};
