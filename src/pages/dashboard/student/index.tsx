import React from 'react';
import {Outlet} from 'react-router';

export const SDashboardRoot = () => {
	return (
		<div className="h-full">
			<Outlet />
		</div>
	);
};
