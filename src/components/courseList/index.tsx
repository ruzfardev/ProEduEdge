import {FC} from 'react';
import {Tab, Tabs, Button} from '@nextui-org/react';
import list from '../../course.json';
import {useNavigate} from 'react-router';
import {PCard} from './card.tsx';

export const CourseList: FC = () => {
	const navigate = useNavigate();
	const handleCourseClick = (id: number) => {
		console.log(id);
		navigate(`/courses/${id}`);
	};
	const catgories = [
		'All',
		'Design',
		'Web Development',
		'Digital',
		'Marketing',
		'Motion Graphics',
		'Business',
		'Photography',
		'Audio',
	];
	// @ts-ignore
	return (
		<section className=" p-10" id="courseList">
			<h1 className="text-4xl font-bold text-center text-amber-400 mb-8">
				Courses
			</h1>
			<div className="md:w-8/12 w-7/12 px-6 mx-auto flex flex-col justify-center flex-wrap gap-4">
				<Tabs
					className="justify-center"
					color="warning"
					variant="underlined"
					aria-label="Tabs variants"
				>
					{catgories.map((variant) => (
						<Tab
							key={variant}
							title={variant}
							aria-label={variant}
							className="text-amber-400"
						/>
					))}
				</Tabs>
			</div>
			<div className="md:w-8/12 w-7/12 mx-auto mt-10 gap-4 grid grid-cols-2 sm:grid-cols-4 justify-center">
				{list.map(({title, banner, id, price}) => (
					<PCard
						key={id}
						id={id}
						title={title}
						banner={banner}
						price={price}
						badge="NEW"
						onCardClick={handleCourseClick}
					/>
				))}
			</div>
			<div className="flex justify-center mt-10 ">
				<Button
					variant="shadow"
					radius="full"
					size="lg"
					className="text-white bg-gradient-to-tr from-amber-500 to-amber-400 px-12"
				>
					Discover
				</Button>
			</div>
		</section>
	);
};
