import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import React, {useEffect} from 'react';
import {getCourseWithContentAction} from '@/redux/features/instructor/slice.ts';
import {useParams} from 'react-router';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui';
import FileIcon from '@/components/file-icon';
import {DownloadIcon} from '@radix-ui/react-icons';
import {CourseContent} from '@/redux/features/student/types.ts';

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
		setSelectedSection(section);
	};
	useEffect(() => {
		dispatch(getCourseWithContentAction(id));
	}, []);
	return (
		<div>
			<div className="sections w-3/12">
				<Accordion
					type="single"
					collapsible
					className="w-full border p-2 border-zinc-100 rounded"
				>
					{data &&
						data.contents.map((section, inx) => (
							<AccordionItem key={inx} value={section.sectionName}>
								<AccordionTrigger
									onClick={() => handleSectionChange(section.sectionName)}
									className={
										selectedSection?.sectionName === section.sectionName
											? 'text-orange-500'
											: ''
									}
								>
									{section.sectionName}
								</AccordionTrigger>
								<AccordionContent>
									{section.resources.map((resource, index) => (
										<div
											key={index}
											className="flex items-center gap-1 mb-1 p-1"
										>
											<span className="file-type-icon flex items-center gap-1 text-orange-500">
												<FileIcon size={15} mimeType={resource.fileType} />
											</span>
											<span
												className={`truncate text-sm text-gray-700 ml-2 cursor-pointer hover:text-gray-900`}
											>
												{resource.id}
											</span>
											<a
												href={resource.url}
												target="_blank"
												className="text-blue-500 ml-auto cursor-pointer hover:text-blue-700"
											>
												<DownloadIcon />
											</a>
										</div>
									))}
								</AccordionContent>
							</AccordionItem>
						))}
				</Accordion>
			</div>
		</div>
	);
};
