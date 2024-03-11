import {Card} from '@/components/ui';
import {cn} from '@/lib/utils';
import {PlayIcon} from '@radix-ui/react-icons';
import React from 'react';
import {useNavigate} from 'react-router';

export const StudentDashboard = () => {
	const navigate = useNavigate();
	const handleClick = (id: number) => {
		navigate(`/dashboard/me/courses/${id}`);
	};
	return (
		<div className="w-full mx-auto gap-4 grid grid-cols-2 sm:grid-cols-4 justify-center">
			{Array.from({length: 14}).map((_, index) => {
				return (
					<Card
						key={index}
						onClick={() => handleClick(index)}
						className="max-w-sm rounded overflow-hidden shadow-lg"
					>
						<div className="relative">
							<img
								className={cn(
									'h-auto w-auto object-cover transition-all',
									'portrait' === 'portrait' ? 'aspect-[4/2]' : 'aspect-square'
								)}
								src={`https://source.unsplash.com/random?sig=${index}`}
								alt="Course image"
							/>
							<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100">
								<button className="p-3 bg-white rounded-full hover:bg-gray-100 transition-all">
									<PlayIcon />
								</button>
							</div>
						</div>
						<div className="px-6 py-4">
							<div className="font-bold mb-2">
								Web Design for Web Developers: Build Beautiful
							</div>
							<p className="text-gray-700 text-base">Jonas Schmedtmann</p>
						</div>
					</Card>
				);
			})}
		</div>
	);
};
