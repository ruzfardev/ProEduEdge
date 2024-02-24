import React, {useEffect, useState} from 'react';
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
export interface ISection {
	id: number;
	name: string;
	label: string;
	description: string;
	active: boolean;
}
export const AddSection = () => {
	const {
		pending,
		createCourse: {id},
	} = useAppSelector((state) => state.courses);
	const dispatch = useAppDispatch();
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
		dispatch(
			uploadCourseContentMediaAction({
				files,
				sectionInfo: data,
			})
		);
		form.reset();
		setFiles([]);
	};

	return (
		<Form {...form}>
			<div className="w-full mx-auto flex gap-1 h-full">
				{/* <div
					className="vertical-tabs w-1/4  
				h-full overflow-scroll no-scrollbar
				dark:bg-gray-800"
				>
					<div className="flex flex-col gap-2">
						<div className="flex justify-between items-center">
							<Button
								onClick={handleAddSection}
								type="button"
								size="default"
								color="warning"
								variant="outline"
							>
								<PlusIcon />
							</Button>
							<Button
								onClick={handleRemoveSection}
								type="button"
								size="default"
								variant="outline"
								color="danger"
							>
								<TrashIcon />
							</Button>
						</div>
						<div className="divider w-full h-[1px] bg-gray-200 dark:bg-gray-700"></div>
						<div className="mt-4 overflow-y-auto no-scrollbar max-h-[calc(100vh-270px)]">
							<div className="flex flex-col gap-2">
								{sections.map((section, index) => (
									<Button
										onClick={() => switchToSection(section.id)}
										key={section.id}
										type="button"
										size="default"
										variant={section.active ? 'default' : 'secondary'}
									>
										{section.label}
									</Button>
								))}
							</div>
						</div>
					</div>
				</div> */}
				<div className="w-full">
					<form
						id="section-form"
						onSubmit={handleSubmit(handleSectionSubmit)}
						className="w-11/12 mx-auto flex flex-col h-full"
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
