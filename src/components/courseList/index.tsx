import {FC} from 'react';
import {
	Card,
	CardBody,
	CardFooter,
	Tab,
	Tabs,
	Image,
	CardHeader,
	Button,
} from '@nextui-org/react';
import list from '../../course.json';
import {useNavigate} from 'react-router';

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
			<h1 className="text-3xl text-yellow-500 text-center font-bold  m-10">
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
							className="text-yellow-500"
						/>
					))}
				</Tabs>
			</div>
			<div className="md:w-8/12 w-7/12 mx-auto mt-10 gap-4 grid grid-cols-2 sm:grid-cols-4 justify-center">
				{list.map((item, index) => (
					// <Card
					// 	isPressable
					// 	className=" text-white h-[250px] border-2"
					// 	key={index}
					// 	isFooterBlurred
					// 	radius="lg"
					// 	isBlurred={true}
					// >
					// 	<CardHeader className="absolute z-10 top-1 flex-col items-start">
					// 		<p className="text-tiny text-white/60 uppercase font-bold">New</p>
					// 	</CardHeader>
					// 	<Image
					// 		loading="lazy"
					// 		shadow="md"
					// 		removeWrapper
					// 		alt={item.title}
					// 		className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
					// 		src={item.banner}
					// 	/>
					// 	<CardFooter className="absolute bg-warning/70  bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
					// 		<div className="truncate w-9/12">
					// 			<p className="text-white text-sm">{item.title}</p>
					// 		</div>
					// 		<Button
					// 			className="text-tiny text-white hover:text-gray-700"
					// 			variant="ghost"
					// 			// color="warning"
					// 			radius="full"
					// 			size="sm"
					// 		>
					// 			{item.price} $
					// 		</Button>
					// 	</CardFooter>
					// </Card>
					<Card
						shadow="md"
						className="bg-yellow-500 text-white h-[250px]"
						key={index}
						isPressable
						radius="md"
						isFooterBlurred
						isBlurred={true}
						onPress={() => handleCourseClick(item.id)}
					>
						<CardHeader className="absolute z-40 top-1 flex-col items-start">
							<p className="text-tiny text-yellow-500 uppercase font-bold">
								New
							</p>
						</CardHeader>
						<CardBody className="overflow-visible p-0">
							<Image
								shadow="sm"
								radius="none"
								width="100%"
								alt={item.title}
								className="w-full object-cover h-[200px]"
								src={item.banner}
							/>
						</CardBody>
						<CardFooter className="text-small justify-between">
							<b className="float-left truncate w-9/12 ">{item.title}</b>
							<Button
								className="text-tiny text-white hover:text-gray-700"
								variant="ghost"
								// color="warning"
								radius="full"
								size="sm"
							>
								{item.price} $
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
			<div className="flex justify-center mt-10 ">
				<Button
					variant="shadow"
					radius="full"
					size="lg"
					className="text-white bg-gradient-to-tr from-yellow-600 to-yellow-500 px-12"
				>
					Discover
				</Button>
			</div>
		</section>
	);
};
