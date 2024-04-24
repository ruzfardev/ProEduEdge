import {FC, useEffect, useRef, useState} from 'react';
import {
	Button,
	Card,
	DialogClose,
	DialogTrigger,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Label,
	Textarea,
} from '@/components/ui';
import {EditorComponent} from '@/components/editor';
import {useForm} from 'react-hook-form';
import {CourseContent} from '@/redux/features/course/types';
import FileIcon from '@/components/file-icon';
import {DownloadIcon, TrashIcon} from '@radix-ui/react-icons';
import {deleteFileFx, deleteSectionFx, updateCourseSectionFx} from '@/api';
import {toast} from 'sonner';
import {getBlobUrlWithSasToken} from '@/lib/utils';
import {ConfirmationDialog} from '@/components/confirmation-dialog';
import {getCourseWithContentAction} from '@/redux/features/instructor/slice';
import {useParams} from 'react-router';
import {useAppDispatch} from '@/redux/hooks';

interface SectionDetailProps {
	section: CourseContent;
}

export const SectionDetail: FC<SectionDetailProps> = ({section}) => {
	const closeBtnRef = useRef<HTMLButtonElement>(null);
	const {id} = useParams();
	const form = useForm<CourseContent>({
		mode: 'onChange',
		defaultValues: {
			id: '',
			sectionName: '',
			title: '',
			content: '',
			status: '',
			courseId: 0,
			resources: [],
		},
	});
	const dispatch = useAppDispatch();
	const {control, handleSubmit} = form;
	const [editorRef, setEditorRef] = useState<any>();
	const handleUpdateSection = async (data: CourseContent) => {
		try {
			data.content = JSON.stringify(editorRef?.getInstance().getMarkdown());
			const res = await updateCourseSectionFx(data, Number(id));
			if (res) {
				//@ts-ignore
				dispatch(getCourseWithContentAction(id));
			}
		} catch (e: any) {
			toast.error('Failed to update section');
		}
	};
	const downloadResource = async (url: string) => {
		try {
			const downloadUrl = getBlobUrlWithSasToken(url, 'recourses');
			const a = document.createElement('a');
			a.href = downloadUrl;
			a.download = 'resource';
			a.click();
		} catch (error) {
			toast.error('Failed to download resource');
		}
	};
	const handleFileDelete = async (fileName: string) => {
		try {
			toast.loading('Deleting resource');
			await deleteFileFx(fileName);
			toast.dismiss();
			toast.success('Resource deleted successfully');
		} catch (error) {
			toast.dismiss();
			toast.error('Failed to delete resource');
		}
	};
	const handleSectionDelete = async () => {
		try {
			toast.loading('Deleting section');
			await deleteSectionFx(section.id, section.courseId);
			toast.dismiss();
			toast.success('Section deleted successfully');
			closeBtnRef.current?.click();
			//@ts-ignore
			dispatch(getCourseWithContentAction(id));
		} catch (error) {
			toast.dismiss();
			toast.error('Failed to delete section');
			closeBtnRef.current?.click();
		}
	};
	useEffect(() => {
		if (section) {
			form.reset({
				id: section.id,
				sectionName: section.sectionName,
				title: section.title,
				content: section.content,
				status: section.status,
				courseId: section.courseId,
				resources: section.resources,
			});
			editorRef?.getInstance().setMarkdown(JSON.parse(section.content));
		}
	}, [section]);
	return (
		<Form {...form}>
			<div className="w-full mx-auto max-h-[calc(100vh-10rem)] no-scrollbar overflow-y-auto flex flex-col gap-1 h-full">
				<div className="w-full">
					<form
						id="section-form"
						onSubmit={handleSubmit(handleUpdateSection)}
						className="w-full p-2 mx-auto flex flex-col h-full"
					>
						<div className="flex flex-col mt-4 gap-4">
							<FormField
								control={form.control}
								name="sectionName"
								rules={{
									required: 'Section name is required.',
								}}
								render={({field}) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter section name"
												type="text"
												id="sectionName"
												color="warning"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="title"
								rules={{
									required: 'Description is required.',
								}}
								render={({field, fieldState}) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder="Section description"
												id="title"
												color="warning"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<EditorComponent
								getEditorInstance={setEditorRef}
								initValue={JSON.parse(section.content)}
								height={'600px'}
							/>
							<Label>Section Resources</Label>
							<div className="grid grid-cols-2 gap-2">
								{section.resources.map((resource, index: number) => (
									<Card
										key={index}
										className="p-2 flex gap-3 text-sm items-center"
									>
										<FileIcon
											key={index}
											mimeType={resource.fileType}
											size={15}
										/>
										<span className="truncate">{resource.id}</span>
										<div className="actions flex gap-2 ml-auto">
											<Button
												variant="outline"
												size="sm"
												className="p-1 w-8 h-8"
												onClick={() => downloadResource(resource.url)}
											>
												<DownloadIcon className="w-4 h-4" />
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="p-1 w-8 h-8"
												onClick={() => handleFileDelete(resource.id)}
											>
												<TrashIcon className="w-4 h-4" />
											</Button>
										</div>
									</Card>
								))}
							</div>
						</div>
					</form>
				</div>
			</div>
			<Button
				form="section-form"
				type="submit"
				size="lg"
				className="block w-full my-4 mt-14"
			>
				Update Section
			</Button>
			<ConfirmationDialog
				onConfirm={handleSectionDelete}
				title="Delete Section"
				description="Are you sure you want to delete this section?"
				trigger={
					<>
						<DialogTrigger className="block w-full rounded bg-red-500 text-white py-2">
							Delete Section
						</DialogTrigger>
						<DialogClose asChild>
							<Button
								ref={closeBtnRef}
								type="button"
								className="hidden block w-full mt-2"
								variant="outline"
								style={{display: 'none', visibility: 'hidden'}}
							>
								Cancel
							</Button>
						</DialogClose>
					</>
				}
			/>
		</Form>
	);
};
