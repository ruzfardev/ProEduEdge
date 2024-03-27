import {Loading} from '@/components/loader';
import {Card} from '@/components/ui';
import {LocalStorageManager, cn, getBlobUrlWithSasToken} from '@/lib/utils';
import {
	getCourseWithContentAction,
	getMyCoursesAction,
} from '@/redux/features/student/slice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {PlayIcon} from '@radix-ui/react-icons';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router';

export const MyCourses = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const l = LocalStorageManager.getInstance();
	const {data, errors, isLoading} = useAppSelector(
		(state) => state.student.myCourses
	);
	const handleClick = (id: number) => {
		navigate(`/dashboard/me/courses/${id}`);
	};
	useEffect(() => {
		dispatch(getMyCoursesAction(l.getItem('user')?.id));
	}, []);
	return (
		<>
			{isLoading && <Loading />}
			{!isLoading && !data && (
				<div className="w-full h-full flex flex-col items-center justify-center mx-auto text-center">
					<span className="text-9xl text-zinc-600">(·.·)</span>
					<h1 className="text-2xl mt-2 font-bold">No courses found</h1>
				</div>
			)}
			{!isLoading && data && (
				<div
					className="
		w-full 
		mx-auto gap-4 
		grid 
		grid-cols-6
		sm:grid-cols-5
		justify-center"
				>
					{data.map((c, index) => {
						return (
							<Card
								key={index}
								onClick={() => handleClick(Number(c.id))}
								className="max-w-sm rounded overflow-hidden shadow-lg"
							>
								<div className="relative">
									<img
										className={cn(
											'h-auto w-auto object-cover transition-all',
											'portrait' === 'portrait'
												? 'aspect-[4/2]'
												: 'aspect-square'
										)}
										src={getBlobUrlWithSasToken(c.banner, 'banners')}
										alt="Course image"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100">
										<button className="p-3 bg-white rounded-full hover:bg-gray-100 transition-all">
											<PlayIcon />
										</button>
									</div>
								</div>
								<div className="px-6 py-4">
									<div className="font-bold mb-2">{c.title}</div>
									<p className="text-gray-700 text-base">
										{c.instructor.firstName} {c.instructor.lastName}
									</p>
								</div>
							</Card>
						);
					})}
				</div>
			)}
		</>
	);
};
