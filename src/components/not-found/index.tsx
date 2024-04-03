import React from 'react';
import image from '@/assets/images/No data-cuate.svg';
export const NotFound = () => {
	return (
		<div className="w-full h-full flex flex-col text-orange-400 items-center justify-center mx-auto text-center">
			<img src={image} alt="No data found" className="w-1/2 h-1/2" />
			<h1 className="text-2xl mt-2 font-bold">No courses found</h1>
		</div>
	);
};
