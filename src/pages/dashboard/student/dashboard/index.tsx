import React, {useEffect} from 'react';
import {useAppSelector} from '@/redux/hooks';
import {useDispatch} from 'react-redux';
import {
	getCourseStatsAction,
	getMyCoursesAction,
} from '@/redux/features/student/slice';
import {Button, Card} from '@/components/ui';
import {RocketIcon} from '@radix-ui/react-icons';
import {ProgressBar} from '@/components/progress-bar';
import {getBlobUrlWithSasToken} from '@/lib/utils';
import {useNavigate} from 'react-router';
import {UpcomingAssignments} from '@/pages/dashboard/student/dashboard/upcoming-assignments';
import {StatChart} from '@/pages/dashboard/student/dashboard/stat-chart';
import {Loading} from '@/components/loader';
import {SubscribeDialog} from '@/pages/dashboard/student/dashboard/subscribe-dialog';
import {NotFound} from '@/components/not-found';

export const StudentDashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		myCourses: {errors, data, isLoading},
		courseStats: {data: stats, errors: statsError, isStatLoading},
	} = useAppSelector((state) => state.student);

	const handleCourseClick = (id: string) => {
		navigate(`/dashboard/me/courses/${id}`);
	};

	useEffect(() => {
		dispatch(getMyCoursesAction());
		dispatch(getCourseStatsAction());
	}, []);
	return (
		<div className="h-full">
			{errors && <div>{errors}</div>}
			<div className="flex flex-col gap-2 h-2/4 min-h-2/4 relative">
				<h1 className="text-2xl font-bold text-orange-400">My Courses</h1>
				{data && data.length === 0 && !isLoading && (
					<>
						<div className="w-full h-[300px] flex flex-col text-orange-400 items-center justify-center mx-auto text-center">
							<h1 className="text-2xl mt-2 font-bold">No courses found</h1>
							<Button
								className="mt-6"
								size="lg"
								onClick={() => navigate('/courses')}
							>
								Explore Courses
							</Button>
						</div>
					</>
				)}
				{isLoading && <Loading />}
				{data &&
					data.map((course) => (
						<Card
							key={course.id}
							className="flex bg-transparent relative flex-col cursor-pointer space-y-4 rounded-none"
						>
							<div className="flex flex-row overflow-hidden">
								<div className="w-2/12">
									<img
										className="h-24 w-full object-cover"
										src={getBlobUrlWithSasToken(course.banner, 'banners')}
										alt="Course image"
									/>
								</div>
								<div className="p-4 flex-grow">
									<h2 className="font-semibold text-lg">{course.title}</h2>
									<p className="text-sm text-gray-500">
										A course by:{' '}
										<span className="font-bold">
											{course.instructor.firstName} {course.instructor.lastName}
										</span>
									</p>
								</div>
								<div className="flex flex-col justify-center items-center">
									{/*//@ts-ignore*/}
									<ProgressBar progress={course.progress} />
								</div>
								<div className="flex flex-col gap-2 justify-center w-2/12 items-center">
									<Button
										variant="outline"
										className="hover:text-orange-500 font-bold"
										onClick={() => handleCourseClick(course.id)}
									>
										<RocketIcon />
									</Button>
								</div>
							</div>
						</Card>
					))}
			</div>
			<div className="flex gap-4 h-2/4">
				<UpcomingAssignments />
				{!isStatLoading && <StatChart data={stats} />}
				<SubscribeDialog width="w-4/12" />
			</div>
		</div>
	);
};
