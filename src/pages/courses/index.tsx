import {ContainerWrapper} from '../../components/container/container-wrapper.tsx';
import {FC, useState} from 'react';
import {
	Input,
	Slider,
	Checkbox,
	Tabs,
	ToggleGroup,
	ToggleGroupItem,
} from '../../components/ui';
import {FaSearch} from 'react-icons/fa';
import list from '../../mock/course.json';
import {PCard} from '../../components/courseList/card.tsx';
import {useNavigate} from 'react-router';

const categories = [
	'Design',
	'Web Development',
	'Digital',
	'Marketing',
	'Motion Graphics',
	'Business',
	'Photography',
	'Audio',
	'Sound & Music',
	'Game Development',
	'Video Editing',
	'Graphic Design',
	'Web Design',
	'User Experience',
	'Business Analytics',
	'Finance & Accounting',
];
export const CoursesPage: FC = () => {
	const [value, setValue] = useState<number[]>([20, 400]);
	const navigate = useNavigate();
	const handleCourseClick = (id: number) => {
		console.log(id);
		navigate(`/courses/${id}`);
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
						{list.map(({title, banner, id, price}) => (
							<PCard
								key={id}
								id={id}
								title={title}
								banner={banner}
								price={price}
								onCardClick={handleCourseClick}
							/>
						))}
					</div>
					<div className="w-4/12 p-4">
						<h1 className="text-xl  font-bold">All Courses</h1>
						{categories.map((category) => (
							<div className="flex items-center space-x-2 py-2 px-3">
								<Checkbox id={category} />
								<label
									htmlFor={category}
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									{category}
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
