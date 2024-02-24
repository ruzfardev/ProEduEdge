import {FC, useEffect, useState} from 'react';
import {ContainerWrapper} from '../../components/container/container-wrapper.tsx';
import {useParams} from 'react-router';
import {
	FaCalendar,
	FaClock,
	FaTelegram,
	FaTwitter,
	FaFacebookF,
} from 'react-icons/fa';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Avatar,
	AvatarFallback,
	Button,
} from '../../components/ui';
import {ShowMoreText} from '../../components/show-more';
import {useAppSelector} from '@/redux/hooks/index.ts';
import {getBlobUrlWithSasToken} from '@/lib/utils.ts';
export const CourseDetail: FC = () => {
	const {id} = useParams();
	const c = useAppSelector((state) => state.courses.selectedCourse);
	return (
		<>
			{c && (
				<>
					<ContainerWrapper
						title={c.title}
						subtitle={c.description}
						banner={getBlobUrlWithSasToken(c.banner, 'banners')}
					>
						<h1>
							Created by:{' '}
							<span className="text-blue-600">{c.instructorId}</span>
						</h1>
						<div className="flex items-center space-x-2 my-3">
							<FaCalendar />
							<span className="text-sm ">Last updated 8/2023</span>
							<div className="flex items-center space-x-1">
								<FaClock />
								<span className="text-sm ">{c.dateTime}</span>
							</div>
						</div>
					</ContainerWrapper>
					<section className="w-9/12 flex gap-3 mx-auto py-10 ">
						<div
							className="w-3/12 p-5
					max-h-[300px] overflow-hidden
				flex flex-col justify-between items-center gap-4 border border-zinc-100 rounded "
						>
							<h5 className="text-xl font-semibold text-center text-orange-400 mb-2">
								Instructor
							</h5>
							<Avatar className="w-24 h-24">
								<AvatarFallback className="bg-gradient-to-tr text-2xl text-white from-orange-500 to-orange-400">
									{c.instructorId}
								</AvatarFallback>
							</Avatar>
							<h5 className="text-xl text-zinc-400 text-center">
								{c.instructorId}
							</h5>
							<div className="flex items-center space-x-2 my-3">
								<div className="cursor-pointer flex bg-gradient-to-tr text-white from-orange-500 to-orange-400 items-center rounded-full p-2 text-sm">
									<FaFacebookF />
								</div>
								<div className="flex cursor-pointer bg-gradient-to-tr text-white from-orange-500 to-orange-400 items-center rounded-full p-2 text-sm">
									<FaTwitter />
								</div>
								<div className="flex bg-gradient-to-tr cursor-pointer text-white from-orange-500 to-orange-400 items-center rounded-full p-2 text-sm">
									<FaTelegram />
								</div>
							</div>
						</div>
						<div className="p-5 w-full flex flex-col border border-zinc-100 rounded ">
							<h5 className="text-xl font-semibold text-orange-400 mb-2">
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
									<span className="text-sm font-bold text-zinc-600">
										Duration
									</span>
									<span className="text-sm font-bold text-zinc-600">Tags</span>
								</div>
								<div className="flex flex-col">
									<span className="text-sm font-light text-zinc-400">
										12/12/2021
									</span>
									<span className="text-sm font-light text-zinc-400">
										#{c.categoryId}
									</span>
								</div>
							</div>
						</div>
						<Accordion
							type="single"
							collapsible
							className="w-4/12 p-3
				border border-zinc-100 rounded
				"
						>
							<AccordionItem value="item-1">
								<AccordionTrigger>
									Module 1: Introduction to the course
								</AccordionTrigger>
								<AccordionContent>Module 1 Content</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>
									Module 2: Introduction to the course
								</AccordionTrigger>
								<AccordionContent>Module 2 Content</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>
									Module 3: Introduction to the course
								</AccordionTrigger>
								<AccordionContent>Module 3 Content</AccordionContent>
							</AccordionItem>
						</Accordion>
					</section>
					<ContainerWrapper
						title={''}
						subtitle="Enroll in this course to get access to unlimited educational resources."
					>
						<Button
							className="bg-white text-orange-500 rounded-full px-12 py-6
					hover:bg-white transition-all duration-500 ease-in-out
					"
						>
							Enroll Now
						</Button>
					</ContainerWrapper>
				</>
			)}
		</>
	);
};
