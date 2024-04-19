import React, {FC, useEffect} from 'react';
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
import {useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {toast} from 'sonner';
import {CreateCourse} from '@/redux/features/course/types';
import {updateCourseFx} from '@/api';
import {getCourseWithContentAction} from '@/redux/features/instructor/slice';

export const GeneralInfo: FC = () => {
	const {category} = useAppSelector((state) => state.courses);
	const {
		selectedCourse: {data, errors, isLoading},
	} = useAppSelector((state) => state.instructor);
	const form = useForm({
		mode: 'onChange',
		defaultValues: {
			id: '',
			title: '',
			description: '',
			categoryId: 0,
			instructorId: 0,
			banner: '',
			price: 0,
			isVerified: false,
		},
	});
	const {control, handleSubmit} = form;
	const dispatch = useAppDispatch();
	const handleCourseDetailUpdate = async (data: CreateCourse) => {
		try {
			const res = await updateCourseFx(data);
			if (res) {
				// @ts-ignore
				dispatch(getCourseWithContentAction(data.id));
			}
		} catch (error) {
			toast.error('Failed to update course');
		}
	};
	useEffect(() => {
		if (data) {
			form.reset({
				id: data.id,
				title: data.title,
				instructorId: data.instructorId,
				description: data.description,
				categoryId: data.categoryId,
				banner: data.banner,
				price: data.price,
				isVerified: data.isVerified,
			});
		}
	}, [data]);
	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(handleCourseDetailUpdate)}
				className="w-full p-3"
			>
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
									className="min-h-[200px]"
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
								disabled={category.isLoading}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{!category.isLoading &&
										category.data?.map((category) => (
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
				<Button type="submit" className="w-full mt-4" color="warning">
					Update
				</Button>
			</form>
		</Form>
	);
};
