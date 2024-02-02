import {api} from '@/api';
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Tabs,
	TabsContent,
	Textarea,
} from '@/components/ui';
import React from 'react';
import {FilePond} from 'react-filepond';
import {set, useForm} from 'react-hook-form';
import './style.css';
import {ArrowLeftIcon, PlusIcon} from '@radix-ui/react-icons';
import {AddSection} from './addSection';
export const AddCourse = () => {
	const form = useForm({});
	const {control, handleSubmit} = form;
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
	const handleSteps = (id: number) => {
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
	};
	const handleCourseDetails = () => {
		setSteps(
			steps.map((step) =>
				step.id === 1
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
	};
	return (
		<Tabs
			className="h-full"
			value={String(steps.find((step) => step.active)?.id)}
		>
			{/* <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
				<li
					className={`flex md:w-full items-center 
			${steps[0].active ? 'text-orange-500  dark:text-gray-100' : ''}
			${steps[1].active ? 'after:border-orange-500 dark:text-gray-100' : ''}
			 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
				>
					<span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
						Course
						<span className="hidden sm:inline-flex sm:ms-2">Details</span>
					</span>
				</li>

				<li
					className={`flex
			${steps[1].active ? 'text-orange-500 dark:text-gray-100' : ''} 
			md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b  after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
				>
					<span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
						<span className="me-2">Course </span>
						<span className="hidden sm:inline-flex sm:ms-2">Content</span>
					</span>
				</li>
				<li
					className={`flex items-center ${
						steps[2].active ? 'text-orange-500' : ''
					}`}
				>
					<span className="me-2">Course</span>
					Pricing
				</li>
			</ol> */}
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
								name="category"
								render={({field}) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="m@example.com">
													m@example.com
												</SelectItem>
												<SelectItem value="m@google.com">
													m@google.com
												</SelectItem>
												<SelectItem value="m@support.com">
													m@support.com
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({field}) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter your price"
												type="text"
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
								name="banner"
								acceptedFileTypes={['image/*']}
								oninit={() => {}}
								// server={{
								// 	process: (
								// 		fieldName,
								// 		file,
								// 		metadata,
								// 		load,
								// 		error,
								// 		progress,
								// 		abort
								// 	) => {
								// 		const formData = new FormData();
								// 		formData.append('file', file, file.name);
								// 		api
								// 			.post('/upload-avatar', formData, {
								// 				headers: {
								// 					'Content-Type': 'multipart/form-data',
								// 				},
								// 			})
								// 			.then((res) => {
								// 				// setValue('avatarUrl', res.data.blob.url);
								// 				load(res.data.blob.url);
								// 			})
								// 			.catch((err) => {
								// 				console.log(err);
								// 			});
								// 	},
								// }}
								labelFileProcessingError={'Error processing file.'}
								allowProcess={true}
								allowMultiple={true}
								// onupdatefiles={setAvatar}
								// labelIdle='<span class="filepond--label-action"><svg xmlns="http://www.w3.org/2000/svg" height="32" width="30" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg></span>'
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
									onClick={() => handleSteps(2)}
									size="lg"
									className="disabled:cursor-not-allowed"
									type="button"
								>
									Next
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
