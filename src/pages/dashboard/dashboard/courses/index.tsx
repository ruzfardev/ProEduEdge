import React from 'react';
import {
	Button,
	Card,
	Input,
	ToggleGroup,
	ToggleGroupItem,
} from '@/components/ui';
import {cn} from '@/lib/utils';
import {
	GridIcon,
	ListBulletIcon,
	Pencil2Icon,
	TrashIcon,
} from '@radix-ui/react-icons';
import course from '@/mock/course-1.json';
import {useNavigate} from 'react-router';
export const ManageCourses = () => {
	const navigate = useNavigate();
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
			<div className="max-h-[calc(100vh-300px)] flex flex-col gap-1 overflow-scroll no-scrollbar p-2">
				{course.map((course) => {
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
											className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full last:mr-0 mr-1
                                            ${
																							course.status === 'live'
																								? 'bg-green-200 text-green-600'
																								: course.status === 'pending'
																								? 'bg-blue-200 text-blue-600'
																								: 'bg-red-200 text-red-600'
																						}
                                        `}
										>
											{course.status}
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
										${course.totalEarnings}
									</span>
									<span className="text-sm">Total Earnings</span>
								</div>
								<div className="flex flex-col justify-center w-2/12 items-center">
									<span className="text-2xl text-gray-500 font-bold">
										{course.rating}
									</span>
									<span className="text-sm">Rating</span>
								</div>
								{/* action buttons edit add delete */}
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
