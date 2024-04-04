import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import React, {useEffect} from 'react';
import {getCourseWithContentAction} from '@/redux/features/instructor/slice.ts';
import {useParams} from 'react-router';
import {Button} from '@/components/ui';
import {CourseContent} from '@/redux/features/course/types';

export const CourseDetailView = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const [selectedSection, setSelectedSection] = React.useState<CourseContent>();
	const {
		selectedCourse: {data, errors, isLoading},
	} = useAppSelector((state) => state.instructor);
	const handleSectionChange = (sectionName: string) => {
		const section = data?.contents.find(
			(section) => section.sectionName === sectionName
		);
		// @ts-ignore
		setSelectedSection(section);
	};
	useEffect(() => {
		//@ts-ignore
		dispatch(getCourseWithContentAction(id));
	}, []);
	// @ts-ignore
	return (
		<div>
			<div className="sections w-3/12">
				<nav className="grid items-start gap-2 px-4 text-sm font-medium">
					<Button variant="outline" size="lg">
						General Information
					</Button>
					{
						// @ts-ignore
						data &&
							data.contents.map((section, inx) => (
								<Button key={inx} variant="outline" size="lg">
									{section.sectionName}
								</Button>
							))
					}
				</nav>
			</div>
		</div>
	);
};
