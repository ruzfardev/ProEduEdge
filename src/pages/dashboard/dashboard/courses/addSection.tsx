import {useState} from 'react';
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
import {EditorParser} from '@/components/editor/editorParser';
import {Editor} from '@toast-ui/react-editor';
export interface ISection {
	id: number;
	name: string;
	label: string;
	content: string;
	description: string;
	active: boolean;
}
export const AddSection = () => {
	const {
		pending,
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
		data.content = editorRef?.getInstance().getMarkdown() || '';
		dispatch(
			uploadCourseContentMediaAction({
				files,
				sectionInfo: data,
			})
		);
		console.info('Section Data:', data);
		form.reset();
		editorRef?.getInstance().setMarkdown('');
		setFiles([]);
	};

	return (
		<Form {...form}>
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
							<EditorComponent getEditorInstance={setEditorRef} />
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
				className="block w-full my-8 mt-14"
			>
				Add Section
			</Button>
		</Form>
	);
};
