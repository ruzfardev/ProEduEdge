import React, {useEffect} from 'react';
import {
	AccordionContent,
	Accordion,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui';
import ReactPlayer from 'react-player';
import {useParams} from 'react-router';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {getMyCoursesAction} from '@/redux/features/student/slice';

export const MyCourse = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const {selectedCourse} = useAppSelector((state) => state.student);

	useEffect(() => {
		dispatch(getMyCoursesAction());
	}, []);

	return (
		<div className="flex gap-1 h-full">
			<div
				className="player-wrapper w-9/12 border-orange-50 border-2 h-full
            "
			>
				<ReactPlayer
					url="https://www.youtube.com/watch?v=_uUmKZvBqN8"
					controls
					height="100%"
					width="100%"
					style={{borderRadius: '10px'}}
				/>
			</div>
			<div className="sections w-3/12">
				<Accordion
					type="single"
					collapsible
					className="w-full border p-2 border-zinc-100 rounded
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
			</div>
		</div>
	);
};
