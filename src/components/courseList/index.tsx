import {FC, useState} from 'react';
import list from '../../mock/course.json';
import {Button} from '../ui/button';
import {useNavigate} from 'react-router';
import {PCard} from './card.tsx';
import {Tabs, TabsList, TabsTrigger} from '../ui/tabs';
import './style.css';
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
	const [loadedImages, setLoadedImages] = useState<any>({});
	return (
		<section className=" p-10" id="courseList">
			<h1 className="text-4xl font-bold text-center text-orange-400 mb-8">
				Courses
			</h1>
			<Tabs
				className="md:w-8/12 w-9/12 px-6 mx-auto flex flex-col justify-center flex-wrap gap-4"
				defaultValue="All"
			>
				<TabsList className="flex justify-center">
					{catgories.map((variant) => (
						<TabsTrigger
							value={variant}
							key={variant}
							title={variant}
							aria-label={variant}
							className="text-orange-400"
						>
							{variant}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
			<div className="md:w-8/12 w-7/12 mx-auto mt-10 gap-4 grid grid-cols-2 sm:grid-cols-3 justify-center">
				{list.map(({title, banner, id, price}) => (
					<PCard
						onCardClick={handleCourseClick}
						key={id}
						id={id}
						title={title}
						banner={banner}
						price={price}
					/>
				))}
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
