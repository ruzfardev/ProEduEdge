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
	Tabs,
	TabsContent,
	Textarea,
} from '@/components/ui';
import React, {useEffect} from 'react';
import {FilePond} from 'react-filepond';
import {useForm} from 'react-hook-form';
import {AddSection} from './addSection';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {Course, CreateCourse} from '@/redux/features/course/types';
import {FilePondInitialFile} from 'filepond';
import {
	createCourseAction,
	uploadBannerAction,
} from '@/redux/features/course/slice';
import './style.css';
import {uploadCourseBannerFx} from '@/api';
import {Toaster, toast} from 'sonner';

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
		createCourse,
		pending,
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
	// course creation steps
	// 1. Course Details
	// 2. Course Content
	// 3. Course Pricing
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
	const handleSteps = (id: number): boolean => {
		// before moving to the next step, validate the current step
		// if the current step is not valid, don't move to the next step
		// if the current step is valid, move to the next step
		if (form.formState.isValid) {
			setSteps(
				steps.map((step) =>
					step.id === id
						? {
								...step,
								active: true,
						  }
						: {
								...step,
								active: false,
						  }
				)
			);
			return true;
		} else {
			// show form validation errors
			form.trigger();
			return false;
		}
	};
	const handleCourseDetails = (data: CreateCourse) => {
		if (isValid) {
			const instructorId = userData?.id ? userData?.id : null;
			// TODO: get user ID from the store and add it as instructorId
			// TODO: convert price, categoryId to number
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
			toast('Uploading course banner');
		}
	};
	// useEffect(() => {
	// 	if (data && !errors) {
	// 		toast.success('User registered successfully');
	// 	}
	// 	if (errors) {
	// 		toast.error(errors);
	// 	}
	// }, [data]);
	return (
		<Tabs
			className="h-full"
			value={String(steps.find((step) => step.active)?.id)}
		>
			<TabsContent value="1">
				<Form {...form}>
					<form
						onSubmit={handleSubmit(handleCourseDetails)}
						className="w-8/12 mx-auto"
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
							<div className="flex justify-between z-50">
								<Button disabled={steps[0].active} type="button" size="lg">
									Back
								</Button>
								<Button
									disabled={steps[2].active}
									size="lg"
									className="disabled:cursor-not-allowed"
									type="submit"
								>
									Nextrrrr
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</TabsContent>
			<TabsContent className="h-full" value="2">
				<AddSection />
			</TabsContent>
		</Tabs>
	);
};
