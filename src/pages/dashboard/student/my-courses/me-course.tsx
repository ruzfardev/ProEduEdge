import React, {useEffect} from 'react';
import {
	AccordionContent,
	Accordion,
	AccordionItem,
	AccordionTrigger,
	Button,
} from '@/components/ui';
import {useParams} from 'react-router';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {getCourseWithContentAction} from '@/redux/features/student/slice';
import {DownloadIcon} from '@radix-ui/react-icons';
import {getBlobUrlWithSasToken, isVideoFile} from '@/lib/utils.ts';
import FileIcon from '@/components/file-icon';
import {VideoPlayer} from '@/components/video-player';
import {EditorParser} from '@/components/editor/editorParser';
import {CourseContent} from '@/redux/features/course/types';
import {updateCourseSectionFx} from '@/api';

export const MyCourse = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const {
		selectedCourse: {data, errors, isLoading},
	} = useAppSelector((state) => state.student);
	const [selectedSection, setSelectedSection] = React.useState<CourseContent>();
	const [selectedVideo, setSelectedVideo] = React.useState<string>();

	const handlePlayVideo = (url: string, type: string) => {
		console.log(url);
		if (isVideoFile(type)) {
			setSelectedVideo(url);
		}
	};
	useEffect(() => {
		// @ts-ignore
		dispatch(getCourseWithContentAction(id));
	}, []);

	useEffect(() => {
		if (data) {
			setSelectedSection(data.contents[0]);
			if (isVideoFile(data.contents[0].resources[0].fileType)) {
				setSelectedVideo(data.contents[0].resources[0].url);
			}
		}
	}, [isLoading, data]);

	const handleSectionChange = (sectionId: string) => {
		const section = data?.contents.find((section) => section.id === sectionId);
		setSelectedSection(section);
	};
	const checkSectionCompletion = (sectionId: string) => {
		const sectionIndex = data?.contents.findIndex(
			(section) => section.id === sectionId
		);
		if (sectionIndex === 0) {
			return true;
		}
		// @ts-ignore
		const previousSection = data?.contents[sectionIndex - 1];
		return previousSection?.status === 'completed';
	};

	const handleSectionCompletion = async () => {
		try {
			const res = await updateCourseSectionFx(
				// @ts-ignore
				{...selectedSection, status: 'completed'},
				Number(id)
			);
			if (res) {
				// @ts-ignore
				dispatch(getCourseWithContentAction(id));
			}
		} catch (e: any) {
			console.log(e);
		}
	};

	useEffect(() => {}, [selectedSection]);

	return (
		<div className="flex gap-1 h-full">
			<div className="vertical-scroll-container w-9/12 max-h-[calc(100vh-10rem)] no-scrollbar overflow-y-auto">
				<div className="player-wrapper w-full h-5/4 max-5/4">
					<VideoPlayer url={selectedVideo} />
				</div>
				<div className="course-info p-2">
					<h1 className="text-xl font-semibold mb-2">
						{selectedSection?.sectionName}
					</h1>
					<p className="text-sm text-gray-700 mb-2">{selectedSection?.title}</p>
				</div>
				<div className="markdown-parser-container p-2">
					{selectedSection?.content && (
						<EditorParser
							markdownSource={JSON.parse(selectedSection?.content)}
						/>
					)}
				</div>
				<Button
					// @ts-ignore
					disabled={!checkSectionCompletion(selectedSection?.id)}
					onClick={handleSectionCompletion}
				>
					Complete Section
				</Button>
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
									onClick={() => handleSectionChange(section.id)}
									className={
										selectedSection?.sectionName === section.sectionName
											? 'text-orange-500'
											: ''
									}
								>
									{section.sectionName}
								</AccordionTrigger>
								<AccordionContent className="hover:bg-zinc-50 p-2 rounded cursor-pointer">
									{section.resources.map((resource, index) => (
										<div
											onClick={() =>
												handlePlayVideo(resource.url, resource.fileType)
											}
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
												href={getBlobUrlWithSasToken(resource.url, 'recourses')}
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
