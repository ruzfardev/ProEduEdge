import {FC, useEffect, useState} from 'react';
import {ContainerWrapper} from '../../components/container/container-wrapper.tsx';
import {useParams} from 'react-router';
import courses from '../../mock/course.json';
import {
	FaCalendar,
	FaClock,
	FaTelegram,
	FaTwitter,
	FaFacebookF,
} from 'react-icons/fa';
import {Accordion, AccordionItem, Avatar, Button} from '@nextui-org/react';
import {ShowMoreText} from '../../components/show-more';
export const CourseDetail: FC = () => {
	const [selectedCourse, setSelectedCourse] = useState<any>();
	const {id} = useParams();
	useEffect(() => {
		window.scrollTo(0, 0);
		const c = courses.find((item) => item.id == Number(id));
		setSelectedCourse(c);
	}, [id]);
	return (
		<>
			<ContainerWrapper
				title={courses[id].title}
				subtitle={courses[id].description}
				banner={`https://source.unsplash.com/random?sig=${id}`}
			>
				<h1>
					Created by:{' '}
					<span className="text-blue-600">{courses[id].author}</span>
				</h1>
				<div className="flex items-center space-x-2 my-3">
					<FaCalendar />
					<span className="text-sm ">Last updated 8/2023</span>
					<div className="flex items-center space-x-1">
						<FaClock />
						<span className="text-sm ">{courses[id].duration}</span>
					</div>
				</div>
			</ContainerWrapper>
			<section className="w-9/12 flex gap-3 mx-auto py-10 ">
				<div
					className="w-3/12 p-5
					max-h-[300px] overflow-hidden
				flex flex-col justify-between items-center gap-4 border border-zinc-100 rounded "
				>
					<h5 className="text-xl font-semibold text-center text-amber-400 mb-2">
						Instructor
					</h5>
					<Avatar
						className="bg-gradient-to-tr w-[80px] h-[80px] text-medium text-white from-amber-500 to-amber-400"
						name={courses[id].author}
						radius="full"
						size="lg"
						color="warning"
						isBordered={true}
					/>
					<h5 className="text-xl text-zinc-400 text-center">
						{courses[id].author}
					</h5>
					<div className="flex items-center space-x-2 my-3">
						<div className="cursor-pointer flex bg-gradient-to-tr text-white from-amber-500 to-amber-400 items-center rounded-full p-2 text-sm">
							<FaFacebookF />
						</div>
						<div className="flex cursor-pointer bg-gradient-to-tr text-white from-amber-500 to-amber-400 items-center rounded-full p-2 text-sm">
							<FaTwitter />
						</div>
						<div className="flex bg-gradient-to-tr cursor-pointer text-white from-amber-500 to-amber-400 items-center rounded-full p-2 text-sm">
							<FaTelegram />
						</div>
					</div>
				</div>
				<div className="p-5 w-full flex flex-col border border-zinc-100 rounded ">
					<h5 className="text-xl font-semibold text-amber-400 mb-2">
						What you will learn
					</h5>
					<ShowMoreText
						text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
						quibusdam, voluptatum, quod, doloribus voluptatem quas quia
						accusantium voluptates natus quos fugiat. Quisquam quibusdam,
						voluptatum, quod, doloribus voluptatem quas quia accusantium
						voluptates natus quos fugiat. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Quisquam quibusdam, voluptatum, quod, doloribus
						voluptatem quas quia accusantium voluptates natus quos fugiat.
						Quisquam quibusdam, voluptatum, quod, doloribus voluptatem quas quia
						accusantium voluptates natus quos fugiat. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Quisquam quibusdam, voluptatum, quod,
						doloribus voluptatem quas quia accusantium voluptates natus quos
						fugiat. Quisquam quibusdam, voluptatum, quod, doloribus voluptatem
						quas quia accusantium voluptates natus quos fugiat. Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Quisquam quibusdam,
						voluptatum, quod, doloribus voluptatem quas quia accusantium
						voluptates natus quos fugiat. Quisquam quibusdam, voluptatum, quod,
						doloribus voluptatem quas quia accusantium voluptates natus quos
						fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Quisquam quibusdam, voluptatum, quod, doloribus voluptatem quas quia
						accusantium voluptates natus quos fugiat. Quisquam quibusdam,
						voluptatum, quod, doloribus voluptatem quas quia accusantium
						voluptates natus quos fugiat. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Quisquam quibusdam, voluptatum, quod, doloribus
						voluptatem quas quia accusantium voluptates natus quos fugiat.
						Quisquam quibusdam, voluptatum, quod, doloribus voluptatem quas quia
						accusantium voluptates natus quos fugiat. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Quisquam quibusdam, voluptatum, quod,
						doloribus voluptatem quas quia accusantium voluptates natus quos
						fugiat. Quisquam quibusdam, voluptatum, quod, doloribus voluptatem
						quas quia accusantium voluptates natus quos fugiat. Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Quisquam quibusdam,
						voluptatum, quod, doloribus voluptatem quas quia accusantium
						voluptates natus quos fugiat. Quisquam quibusdam, voluptatum, quod,
						doloribus voluptatem quas quia accusantium voluptates natus quos
						fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Quisquam quibusdam, voluptatum, quod, doloribus voluptatem quas quia
						accusantium voluptates natus quos fugiat. Quisquam quibusdam,
						voluptatum, quod, doloribus voluptatem quas quia accusantium
						voluptates natus quos fugiat. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Quisquam quibusdam, voluptatum, quod, doloribus
						voluptatem quas quia accusantium voluptates natus quos fugiat.
						Quisquam quibusdam, voluptatum, quod, doloribus voluptatem quas quia
						accusantium voluptates natus quos fugiat. Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Quisquam quibusdam, voluptatum, quod,
						doloribus voluptatem quas quia accusantium voluptates natus quos
						fugiat. Quisquam quibusdam, voluptatum, quod, doloribus voluptatem
						quas quia accusantium voluptates natus quos fugiat. Lorem ipsum
						dolor sit amet consectetur adipisicing elit. Quisquam quibusdam,
						voluptatum, quod, doloribus voluptatem quas quia accusantium
						voluptates natus quos fugiat. Quisquam quibusdam, voluptatum, quod,
						doloribus voluptatem quas quia accusantium voluptates natus quos
						fugiat."
						maxLength={2000}
						className="text-zinc-400 mb-2 font-light text-sm transition-all duration-500 ease-in-out"
					/>
					<div className="flex mt-auto items-center space-x-2 gap-20 my-3">
						<div className="flex flex-col">
							<span className="text-sm font-bold text-zinc-600">
								Released Date
							</span>
							<span className="text-sm font-bold text-zinc-600">Duration</span>
							<span className="text-sm font-bold text-zinc-600">Tags</span>
						</div>
						<div className="flex flex-col">
							<span className="text-sm font-light text-zinc-400">
								12/12/2021
							</span>
							<span className="text-sm font-light text-zinc-400">
								{courses[id].duration}
							</span>
							<span className="text-sm font-light text-zinc-400">
								#{courses[id].category}
							</span>
						</div>
					</div>
				</div>
				<Accordion
					className="w-4/12
				 	max-h-[500px] overflow-y-auto
				 	scrollbar-hide
				 border border-zinc-100"
					variant="bordered"
				>
					<AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
						Module 1
					</AccordionItem>
					<AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
						Module 2
					</AccordionItem>
					<AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
						Module 3
					</AccordionItem>
					<AccordionItem key="4" aria-label="Accordion 4" title="Accordion 4">
						Module 4
					</AccordionItem>
					<AccordionItem key="5" aria-label="Accordion 5" title="Accordion 5">
						Module 5
					</AccordionItem>
					<AccordionItem key="6" aria-label="Accordion 6" title="Accordion 6">
						Module 6
					</AccordionItem>
					<AccordionItem key="7" aria-label="Accordion 7" title="Accordion 7">
						Module 7
					</AccordionItem>
					<AccordionItem key="8" aria-label="Accordion 8" title="Accordion 8">
						Module 8
					</AccordionItem>
					<AccordionItem key="9" aria-label="Accordion 9" title="Accordion 9">
						Module 9
					</AccordionItem>
					<AccordionItem
						key="10"
						aria-label="Accordion 10"
						title="Accordion 10"
					>
						Module 10
					</AccordionItem>
				</Accordion>
			</section>
			<ContainerWrapper
				title={''}
				subtitle="Enroll in this course to get access to unlimited educational resources."
			>
				<Button radius="full" className="bg-white px-12 py-6 text-warning">
					Enroll Now
				</Button>
			</ContainerWrapper>
		</>
	);
};
