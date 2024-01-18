import React from 'react';
import {Link, useRouteError} from 'react-router-dom';
import {Button, Alert, AlertTitle, AlertDescription} from '../components/ui';
import errorImg from '../assets/images/error.svg';
import {FaExclamation} from 'react-icons/fa';
export const ErrorRoute: React.FC = () => {
	let error = useRouteError();
	return (
		<div
			style={{
				width: '100%',
				height: '100vh',
				overflow: 'hidden',
			}}
		>
			<div className="flex h-full">
				<div className=" h-2/4 w-2/4">
					<img src={errorImg} alt="error" className="" />
				</div>
				<div className="flex flex-col items-start justify-center  px-20">
					<h1 className="text-5xl mb-5 font-bold text-gray-800">
						Page not found :(
					</h1>

					{error?.message ? (
						<Alert variant="destructive">
							<FaExclamation />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>
								Error: {error?.message?.toString()}
							</AlertDescription>
						</Alert>
					) : (
						<p>
							The page you are looking for might have been removed had its name
							changed or is temporarily unavailable.
						</p>
					)}
					<Button
						color="warning"
						className="mt-8 rounded-full  text-white px-10 py-7"
					>
						<Link to="/">Go to homepage</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
