import {ContainerWrapper} from '../../components/container/container-wrapper.tsx';
import {FC, useState} from 'react';
import {
	Input,
	Slider,
	Checkbox,
	ToggleGroup,
	ToggleGroupItem,
} from '../../components/ui';
import {PCard} from '../../components/courseList/card.tsx';
import {useNavigate} from 'react-router';
import {useAppDispatch, useAppSelector} from '@/redux/hooks/index.ts';
import {selectCourseAction} from '@/redux/features/course/slice.ts';
import {Course} from '@/redux/features/course/types.ts';
export const CoursesPage: FC = () => {
	const [value, setValue] = useState<number[]>([20, 400]);
	const {data, errors, isLoading} = useAppSelector(
		(state) => state.courses.courses
	);
	const {
		data: category,
		errors: categoryError,
		isLoading: categoryIsLoading,
	} = useAppSelector((state) => state.courses.category);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleCourseClick = (course: Course) => {
		dispatch(selectCourseAction(course));
		navigate(`/courses/${course.id}`);
	};
	return (
		<>
			<ContainerWrapper
				className="mt-16"
				title="Browse Thousands of Our Video Tutorials"
				subtitle="Access all tutorials and resources when you become a premium member of our platform."
			/>
			<section className="w-8/12 mx-auto py-4">
				<Input
					placeholder="Search for Courses i.e web-development"
					type="search"
				/>
				<div className="flex justify-between gap-4 mt-4">
					<div className="md:w-full gap-4 grid grid-cols-2 sm:grid-cols-3 justify-center">
						{!isLoading &&
							data &&
							data.map((c) => (
								<PCard key={c.id} course={c} onCardClick={handleCourseClick} />
							))}
					</div>
					<div className="w-4/12 p-4">
						<h1 className="text-xl  font-bold">All Courses</h1>
						{!categoryIsLoading &&
							category &&
							category.map((category) => (
								<div
									key={category.id}
									className="flex items-center space-x-2 py-2 px-3"
								>
									<Checkbox id={category.id} />
									<label
										htmlFor={category.id}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{category.name}
									</label>
								</div>
							))}
						<h1 className="text-xl font-bold mt-4">Plans</h1>
						<ToggleGroup type="single" size="lg">
							<ToggleGroupItem value="free">Free</ToggleGroupItem>
							<ToggleGroupItem value="paid">Paid</ToggleGroupItem>
						</ToggleGroup>
						<h1 className="text-xl font-bold mt-4">Price</h1>
						<Slider
							step={5}
							max={400}
							min={20}
							// value={value}
						/>
						<p className="text-default-500 font-medium text-small">
							Selected budget:{' '}
							{Array.isArray(value) && value.map((b) => `$${b}`).join(' – ')}
						</p>
					</div>
				</div>
			</section>
		</>
	);
};
