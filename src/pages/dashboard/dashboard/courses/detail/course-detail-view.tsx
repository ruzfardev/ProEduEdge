import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import React, {useEffect} from 'react';
import {getCourseWithContentAction} from '@/redux/features/instructor/slice.ts';
import {useParams} from 'react-router';
import {Button} from '@/components/ui';
import {CourseContent} from '@/redux/features/course/types';
import {GeneralInfo} from '@/pages/dashboard/dashboard/courses/detail/general-info';
import {SectionDetail} from '@/pages/dashboard/dashboard/courses/detail/section-detail';
import {AddSection} from '@/pages/dashboard/dashboard/courses/addSection';
import {createCourseSuccessAction} from '@/redux/features/course/slice';

export const CourseDetailView = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const [selected, setSelected] = React.useState<string>('general');
	const [selectedSection, setSelectedSection] = React.useState<CourseContent>();
	const {
		pending,
		selectedCourse: {data, errors, isLoading},
	} = useAppSelector((state) => state.instructor);
	const {courseCreationStatus} = useAppSelector((state) => state.courses);
	const handleSectionChange = (id: string) => {
		const section = data?.contents.find((section) => section.id == id);
		if (section) {
			// @ts-ignore
			setSelectedSection(section);
		}
	};
	const handleSelected = (sectionName: string) => {
		setSelected(sectionName);
		if (sectionName === 'add-section') {
			//@ts-ignore
			dispatch(createCourseSuccessAction({...data}));
		}
	};
	useEffect(() => {
		//@ts-ignore
		dispatch(getCourseWithContentAction(id));
	}, [courseCreationStatus]);

	return (
		<div className="flex">
			{pending && (
				<div className="fixed inset-0 bg-white bg-opacity-50 z-50 flex flex-col justify-center items-center">
					<div className="w-20 h-20 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
					Loading...
				</div>
			)}
			<div className="sections w-3/12">
				<nav className="grid items-start gap-2 px-4 text-sm font-medium">
					<Button
						onClick={() => handleSelected('general')}
						variant="outline"
						size="lg"
					>
						General Information
					</Button>
					{data &&
						data.contents.map((section, inx) => (
							<Button
								key={section?.id}
								onClick={() => {
									handleSelected(section.id);
									handleSectionChange(section.id);
								}}
								variant="outline"
								size="lg"
							>
								{section.sectionName}
							</Button>
						))}
					<Button
						className="mt-4 border border-dashed"
						variant="ghost"
						size="lg"
						onClick={() => handleSelected('add-section')}
					>
						Add Section
					</Button>
				</nav>
			</div>
			<div className="content w-9/12 mx-auto max-h-[calc(100vh-10rem)] no-scrollbar overflow-y-auto">
				{selected === 'general' ? (
					<div>
						<GeneralInfo />
					</div>
				) : selected === 'add-section' ? (
					<AddSection />
				) : (
					<div>
						{selectedSection && <SectionDetail section={selectedSection} />}
					</div>
				)}
			</div>
		</div>
	);
};
