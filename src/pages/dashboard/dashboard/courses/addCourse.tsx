import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from '@/components/ui';
import React, {useEffect} from 'react';
import {FilePond} from 'react-filepond';
import {useForm} from 'react-hook-form';
import {AddSection} from './addSection';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {Course, CreateCourse} from '@/redux/features/course/types';
import {FilePondInitialFile} from 'filepond';
import {uploadBannerAction} from '@/redux/features/course/slice';
import './style.css';
import {uploadCourseBannerFx} from '@/api';

export const AddCourse = () => {
	let pond = React.useRef(null);
	const dispatch = useAppDispatch();

	const [files, setFiles] = React.useState<FilePondInitialFile[]>([]);
	const form = useForm<Course>({
		mode: 'onChange',
		defaultValues: {
			title: '',
			description: '',
			categoryId: undefined,
			price: 0,
		},
	});
	const {
		category: {data, errors, isLoading},
	} = useAppSelector((state) => state.courses);
	const {
		user: {data: userData},
	} = useAppSelector((state) => state.users);
	const {
		control,
		handleSubmit,
		formState: {isValid},
	} = form;
	const [steps, setSteps] = React.useState([
		{
			id: 1,
			name: 'Course Details',
			active: true,
		},
		{
			id: 2,
			name: 'Course Content',
			active: false,
		},
		{
			id: 3,
			name: 'Course Pricing',
			active: false,
		},
	]);
	const handleCourseDetails = (data: CreateCourse) => {
		if (isValid) {
			const instructorId = userData?.id ? userData?.id : null;
			const file = files[0].file;
			const formData = new FormData();
			formData.append('file', file);
			data = {
				...data,
				instructorId,
				price: Number(data.price),
				categoryId: Number(data.categoryId),
			};
			dispatch(
				uploadBannerAction({
					data,
					file,
				})
			);
		}
	};
	return (
		<div className="w-10/12 mx-auto max-h-[calc(100vh-10rem)] no-scrollbar overflow-y-auto">
			<div className="h-full">
				<h4 className="text-2xl font-bold text-center">Add Course</h4>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(handleCourseDetails)}
						className="w-full p-3"
					>
						<div className="flex flex-col mt-4 gap-4">
							<FormField
								control={form.control}
								name="title"
								rules={{
									required: 'Title is required.',
								}}
								render={({field}) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter your title"
												type="text"
												id="title"
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
												placeholder="Course description"
												id="description"
												color="warning"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="categoryId"
								rules={{
									required: 'Category is required.',
								}}
								render={({field}) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<Select
											onValueChange={(value) => {
												field.onChange(value);
											}}
											defaultValue={field.value ? field.value.toString() : ''}
											disabled={isLoading}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{data?.map((category) => (
													<SelectItem
														key={category.id}
														value={category.id.toString()}
													>
														{category.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								rules={{
									required: 'Price is required.',
									min: {value: 1, message: 'Price must be greater than 0'},
								}}
								render={({field}) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter your price"
												type="number"
												id="price"
												color="warning"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormLabel>Course Image</FormLabel>
							<FilePond
								name="file"
								files={files}
								ref={(ref) => {
									pond = ref;
								}}
								required
								imagePreviewHeight={400}
								onupdatefiles={setFiles}
								instantUpload={false}
								server={{
									process: (
										fieldName,
										file,
										metadata,
										load,
										error,
										progress,
										abort
									) => {
										uploadCourseBannerFx(file)
											.then((res) => {
												console.log(res);
												load(res);
											})
											.catch((err) => {
												error('Error uploading file');
											});

										return {
											abort: () => {
												abort();
											},
										};
									},
								}}
								acceptedFileTypes={['image/*']}
								oninit={() => {}}
								labelFileProcessingError={'Error processing file.'}
								allowProcess={true}
								allowReplace={true}
								allowMultiple={false}
								stylePanelLayout="compact"
								allowDrop={false}
								allowPaste={false}
								credits={false}
							/>
						</div>
						<Button
							disabled={steps[2].active}
							size="lg"
							className="disabled:cursor-not-allowed block w-full my-4"
							type="submit"
						>
							Submit
						</Button>
					</form>
				</Form>
				<h4 className="text-2xl font-bold text-center">Course Content</h4>
				<AddSection />
			</div>
		</div>
	);
};
