import React, {useEffect} from 'react';
import {
	Button,
	Card,
	Input,
	ToggleGroup,
	ToggleGroupItem,
} from '@/components/ui';
import {cn, LocalStorageManager} from '@/lib/utils';
import {
	GridIcon,
	ListBulletIcon,
	Pencil2Icon,
	TrashIcon,
} from '@radix-ui/react-icons';
import course from '@/mock/course-1.json';
import {useNavigate} from 'react-router';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {getInstructorCoursesAction} from '@/redux/features/instructor/slice.ts';
import {Loading} from '@/components/loader';
export const ManageCourses = () => {
	const dispatch = useAppDispatch();
	const l = LocalStorageManager.getInstance();
	const {
		myCourses: {data, isLoading, errors},
	} = useAppSelector((state) => state.instructor);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getInstructorCoursesAction(l.getItem('user')?.id));
	}, []);
	const handleCourseDetails = (id: number) => {
		navigate(`/dashboard/courses/${id}`);
	};
	return (
		<div className="mx-auto">
			<div className="flex justify-start items-center space-x-2 mb-4">
				<Input placeholder="Search courses..." className="max-w-sm" />
				<ToggleGroup type="single" variant="outline">
					<ToggleGroupItem value="bold" aria-label="Toggle bold">
						<ListBulletIcon className="h-4 w-4" />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic" aria-label="Toggle italic">
						<GridIcon className="h-4 w-4" />
					</ToggleGroupItem>
				</ToggleGroup>
				<Button
					onClick={() => navigate('/dashboard/courses/add')}
					className="text-white font-bold py-2 px-4 rounded"
				>
					New course
				</Button>
			</div>
			{isLoading && <Loading />}
			<div className="max-h-[calc(100vh-300px)] flex flex-col gap-1 overflow-scroll no-scrollbar p-2">
				{!isLoading && !data && (
					<div className="w-full h-full flex flex-col items-center justify-center mx-auto text-center">
						<span className="text-9xl text-zinc-600">(·.·)</span>
						<h1 className="text-2xl mt-2 font-bold">No courses found</h1>
					</div>
				)}
				{!isLoading &&
					data?.map((course) => {
						return (
							<Card
								onClick={() => handleCourseDetails(course.id)}
								key={course.id}
								className="flex flex-col cursor-pointer space-y-4 rounded-none"
							>
								<div className="flex flex-row bg-white overflow-hidden">
									<div className="p-4 flex-grow">
										<h2 className="font-semibold text-lg">{course.title}</h2>
										<div className="flex mt-2">
											<span
												className={`text-xs bg-green-200 text-green-600 font-semibold inline-block py-1 px-2 uppercase rounded-full last:mr-0 mr-1`}
											>
												Live
											</span>
										</div>
									</div>
									<div className="flex flex-col justify-center w-2/12 items-center">
										<span className="text-2xl text-gray-500 font-bold">
											{course.totalStudents}
										</span>
										<span className="text-sm">Students</span>
									</div>
									<div className="flex flex-col justify-center w-2/12 items-center">
										<span className="text-2xl text-gray-500 font-bold">
											${course.totalEarning}
										</span>
										<span className="text-sm">Total Earnings</span>
									</div>
									<div className="flex flex-col justify-center w-2/12 items-center">
										<span className="text-2xl text-gray-500 font-bold">
											{course.rating}
										</span>
										<span className="text-sm">Rating</span>
									</div>
									<div className="flex flex-col gap-2 justify-center w-2/12 items-center">
										<Button
											variant="outline"
											className="hover:text-green-500 
                                        font-bold"
										>
											<Pencil2Icon />
										</Button>
										<Button
											variant="outline"
											className="hover:text-red-500 font-bold"
										>
											<TrashIcon />
										</Button>
									</div>
								</div>
							</Card>
						);
					})}
			</div>
		</div>
	);
};
