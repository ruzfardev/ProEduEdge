import {FC} from 'react';
import {Button} from '../ui/button';
import {useNavigate} from 'react-router';
import {PCard} from './card.tsx';
import {Tabs, TabsList, TabsTrigger} from '../ui/tabs';
import './style.css';
import {useAppDispatch, useAppSelector} from '@/redux/hooks/index.ts';
import {selectCourseAction} from '@/redux/features/course/slice.ts';
import {Course} from '@/redux/features/course/types.ts';
export const CourseList: FC = () => {
	const navigate = useNavigate();
	const {
		courses: {data, errors, isLoading},
	} = useAppSelector((state) => state.courses);
	const {
		data: catgories,
		errors: catgoriesError,
		isLoading: catgoriesIsLoading,
	} = useAppSelector((state) => state.courses.category);
	const dispatch = useAppDispatch();
	const handleCourseClick = (c: Course) => {
		const {id} = c;
		dispatch(selectCourseAction(c));
		navigate(`/courses/${id}`);
	};
	return (
		<section className=" p-10" id="courseList">
			<h1 className="text-4xl font-bold text-center text-orange-400 mb-8">
				Courses
			</h1>
			<Tabs
				className="md:w-8/12 overflow-y-scroll no-scrollbar w-9/12 px-6 mx-auto flex flex-col justify-center flex-wrap gap-4"
				defaultValue="All"
			>
				<TabsList
					className="flex justify-center
				overflow-y-auto  max-w-[700px]:
				"
				>
					{!catgoriesIsLoading && catgoriesError ? (
						<div>{catgoriesError}</div>
					) : (
						catgories?.map((c) => (
							<TabsTrigger
								value={c.id}
								key={c.id}
								title={c.name}
								aria-label={c.name}
								className="text-orange-400"
							>
								{c.name}
							</TabsTrigger>
						))
					)}
				</TabsList>
			</Tabs>
			<div className="md:w-8/12 w-7/12 mx-auto mt-10 gap-4 grid grid-cols-2 sm:grid-cols-3 justify-center">
				{isLoading ? (
					<div>Loading</div>
				) : (
					data?.map((c) => (
						<PCard onCardClick={handleCourseClick} key={c.id} course={c} />
					))
				)}
			</div>
			<div className="flex justify-center mt-10 ">
				<Button
					size="lg"
					className="rounded-full shadow-md text-white bg-gradient-to-tr from-orange-500 to-orange-400 px-12"
				>
					Discover
				</Button>
			</div>
		</section>
	);
};
