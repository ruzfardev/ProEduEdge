import {ContainerWrapper} from '../../components/container/container-wrapper.tsx';
import {FC, useState} from 'react';
import {
	Input,
	Listbox,
	ListboxItem,
	Slider,
	Tab,
	Tabs,
} from '@nextui-org/react';
import {FaSearch} from 'react-icons/fa';
import list from '../../course.json';
import {PCard} from '../../components/courseList/card.tsx';
import {Outlet, useNavigate} from 'react-router';

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
				title="Browse Thousands of Our Video Tutorials"
				subtitle="Access all tutorials and resources when you become a premium member of our platform."
			/>
			<section className="w-8/12 mx-auto py-4">
				<Input
					classNames={{
						base: 'max-w-full',
						mainWrapper: 'h-full',
						inputWrapper: 'h-full font-normal',
					}}
					placeholder="Search for Courses i.e web-development"
					size="lg"
					type="search"
					color="warning"
					startContent={<FaSearch size={15} />}
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
								badge={id % 2 === 0 ? 'FREE' : 'PREMIUM'}
								onCardClick={handleCourseClick}
							/>
						))}
					</div>
					<div className="w-4/12 p-4">
						<h1 className="text-xl  font-bold">All Courses</h1>
						<Listbox
							variant="flat"
							color="warning"
							selectionMode="single"
							// selectedKeys={selectedKeys}
							// onSelectionChange={setSelectedKeys}
						>
							{categories.map((category) => (
								<ListboxItem
									endContent={Math.floor(Math.random() * (500 - 100 + 1)) + 100}
									key={category}
								>
									{category}
								</ListboxItem>
							))}
						</Listbox>
						<h1 className="text-xl font-bold mt-4">Plans</h1>
						<Tabs
							color="warning"
							radius="full"
							variant="light"
							size="lg"
							aria-label="plans"
						>
							<Tab className="text-white" key="paid" title="Paid" />
							<Tab key="free" title="Free" />
						</Tabs>
						<h1 className="text-xl font-bold mt-4">Price</h1>
						<Slider
							label="Select a budget"
							formatOptions={{style: 'currency', currency: 'USD'}}
							step={5}
							maxValue={400}
							minValue={20}
							value={value}
							color="warning"
							// @ts-ignore
							onChange={setValue}
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
