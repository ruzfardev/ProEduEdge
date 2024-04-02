import React, {useEffect} from 'react';
import {
	AccordionContent,
	Accordion,
	AccordionItem,
	AccordionTrigger,
	Button,
	Checkbox,
} from '@/components/ui';
import ReactPlayer from 'react-player';
import {useParams} from 'react-router';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {getCourseWithContentAction} from '@/redux/features/student/slice';
import {CourseContent} from '@/redux/features/student/types.ts';
import {DownloadIcon} from '@radix-ui/react-icons';
import {getBlobUrlWithSasToken, getFileIconComponent} from '@/lib/utils.ts';
import FileIcon from '@/components/file-icon';
import {VideoPlayer} from '@/components/video-player';
import {EditorParser} from '@/components/editor/editorParser';

export const MyCourse = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const {
		selectedCourse: {data, errors, isLoading},
	} = useAppSelector((state) => state.student);
	const [selectedSection, setSelectedSection] = React.useState<CourseContent>();
	useEffect(() => {
		dispatch(getCourseWithContentAction(id));
	}, []);

	useEffect(() => {
		if (data) {
			setSelectedSection(data.contents[0]);
		}
	}, [isLoading, data]);

	const handleSectionChange = (sectionName: string) => {
		const section = data?.contents.find(
			(section) => section.sectionName === sectionName
		);
		setSelectedSection(section);
	};
	useEffect(() => {}, [selectedSection]);

	return (
		<div className="flex gap-1 h-full">
			<div className="vertical-scroll-container w-9/12 max-h-[calc(100vh-10rem)] no-scrollbar overflow-y-auto">
				<div className="player-wrapper w-full h-5/4 border-orange-50 border-2 ">
					{selectedSection && <VideoPlayer selectedSection={selectedSection} />}
				</div>
				<div className="course-info p-2">
					<h1 className="text-xl font-semibold mb-2">{data?.title}</h1>
					<p className="text-sm text-gray-700 mb-2">{data?.description}</p>
				</div>
				<div className="markdown-parser-container">
					<EditorParser />
				</div>
			</div>
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
									{/*<Checkbox*/}
									{/*	id={section.sectionName}*/}
									{/*	checked={selectedSection?.status === 'completed'}*/}
									{/*/>*/}
									{section.sectionName}
								</AccordionTrigger>
								<AccordionContent className="hover:bg-zinc-50 p-2 rounded cursor-pointer">
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
