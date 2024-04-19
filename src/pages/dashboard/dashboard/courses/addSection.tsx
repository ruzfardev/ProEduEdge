import {useEffect, useState} from 'react';
import {
	Button,
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
import {FilePond} from 'react-filepond';
import {useForm} from 'react-hook-form';
import {FilePondInitialFile} from 'filepond';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {uploadCourseContentMediaAction} from '@/redux/features/course/slice';
import {toast} from 'sonner';
import {EditorComponent} from '@/components/editor';
import {Editor} from '@toast-ui/react-editor';
import {v4 as uuidv4} from 'uuid';
export interface ISection {
	id: string;
	name: string;
	label: string;
	content: string;
	description: string;
	active: boolean;
}
export const AddSection = () => {
	const {
		pending,
		courseCreationStatus,
		createCourse: {id},
	} = useAppSelector((state) => state.courses);
	const dispatch = useAppDispatch();
	const [editorRef, setEditorRef] = useState<Editor>();
	const form = useForm<ISection>({
		defaultValues: {
			name: '',
			description: '',
		},
	});
	const [files, setFiles] = useState<
		Array<FilePondInitialFile | File | Blob | string>
	>([]);
	const {control, reset, handleSubmit, getValues} = form;

	const handleSectionSubmit = (data: ISection) => {
		if (!id) {
			toast.error('Please create a course first. Then add a section');
			return;
		}
		data.id = uuidv4();
		data.content = JSON.stringify(editorRef?.getInstance().getMarkdown()) || '';
		if (files) {
			dispatch(
				uploadCourseContentMediaAction({
					files,
					sectionInfo: data,
				})
			);
		}
		// form.reset();
		// editorRef?.getInstance().setMarkdown('');
		// setFiles([]);
	};

	useEffect(() => {
		if (courseCreationStatus === 'SUCCESS') {
			reset();
			setFiles([]);
			editorRef?.getInstance().setMarkdown('');
		}
	}, [pending, courseCreationStatus]);

	return (
		<Form {...form}>
			{pending && (
				<div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 z-50">
					<div className="w-full h-full flex justify-center items-center">
						<div className="bg-white p-4 rounded-lg shadow-lg">
							<h1 className="text-lg font-bold">Uploading...</h1>
						</div>
					</div>
				</div>
			)}
			<div className="w-full mx-auto flex flex-col gap-1 h-full">
				<div className="w-full">
					<form
						id="section-form"
						onSubmit={handleSubmit(handleSectionSubmit)}
						className="w-full p-2 mx-auto flex flex-col h-full"
					>
						<div className="flex flex-col mt-4 gap-4">
							<FormField
								control={form.control}
								name="name"
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
												id="name"
												color="warning"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="description"
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
												id="description"
												color="warning"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<EditorComponent
								height={'300px'}
								getEditorInstance={setEditorRef}
							/>
							<Label>Section Recources</Label>
							<FilePond
								name="recources"
								acceptedFileTypes={['image/*']}
								oninit={() => {}}
								files={files}
								onupdatefiles={(fileItems) => {
									setFiles(fileItems.map((fileItem) => fileItem.file));
								}}
								labelFileProcessingError={'Error processing file.'}
								allowProcess={true}
								allowMultiple={true}
								stylePanelLayout="compact"
								allowDrop={false}
								allowPaste={false}
								credits={false}
							/>
						</div>
					</form>
				</div>
			</div>
			<Button
				form="section-form"
				type="submit"
				size="lg"
				className="block w-full"
			>
				Add Section
			</Button>
		</Form>
	);
};
