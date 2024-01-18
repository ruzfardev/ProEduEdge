import React, {FC, useEffect, useState} from 'react';
import {WrapperAuth} from './wrapper.tsx';
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
} from '../../components/ui/index.ts';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {SubmitHandler, useForm, set} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {FilePond} from 'react-filepond';
import {FilePondFile} from 'filepond';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/index.ts';
import {registerUser, selectUser} from '../../redux/features/auth/userSlice.ts';
import './style.scss';
import {IUser} from '../../redux/models/index.ts';
import {api} from '../../api/index.ts';

export const Register: FC = () => {
	const form = useForm<IUser>({
		mode: 'onSubmit',
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			avatarUrl: '',
		},
	});
	const {control, handleSubmit, setValue} = form;
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const [avatar, setAvatar] = useState<FilePondFile[]>();
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	useEffect(() => {}, [user]);

	const handleUserRegister: SubmitHandler<IUser> = (data: IUser) => {
		try {
			if (data.avatarUrl === '') {
				// set the first letter of first name and last name to avatarUrl
				const firstLetterFirstName = data.firstName[0];
				const firstLetterLastName = data.lastName[0];
				const avatarUrl = `${firstLetterFirstName}${firstLetterLastName}`;
				setValue('avatarUrl', avatarUrl);
				dispatch(registerUser({...data}));
			} else {
				dispatch(registerUser({...data}));
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<WrapperAuth>
			<Form {...form}>
				<form
					onSubmit={handleSubmit(handleUserRegister)}
					className="w-8/12 mx-auto"
				>
					<h2 className="text-4xl font-bold text-center text-orange-400 mb-8">
						Register
					</h2>
					<div>
						<FilePond
							name="avatar"
							acceptedFileTypes={['image/*']}
							oninit={() => {}}
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
									const formData = new FormData();
									formData.append('file', file, file.name);
									api
										.post('/upload-avatar', formData, {
											headers: {
												'Content-Type': 'multipart/form-data',
											},
										})
										.then((res) => {
											setValue('avatarUrl', res.data.blob.url);
											load(res.data.blob.url);
										})
										.catch((err) => {
											console.log(err);
										});
								},
							}}
							labelFileProcessingError={'Error processing file.'}
							allowProcess={true}
							allowMultiple={false}
							onupdatefiles={setAvatar}
							labelIdle='<span class="filepond--label-action"><svg xmlns="http://www.w3.org/2000/svg" height="32" width="30" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg></span>'
							stylePanelLayout="compact circle"
							allowDrop={false}
							allowPaste={false}
							credits={false}
						/>
					</div>

					<div className="flex flex-col gap-4">
						<div className="flex justify-between flex-row gap-1">
							<FormField
								control={form.control}
								rules={{
									required: 'First Name is required. Minimum 6 characters',
									minLength: {
										value: 6,
										message: 'First Name is required. Minimum 6 characters',
									},
								}}
								name="firstName"
								render={({field, fieldState}) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												placeholder="First Name"
												type="text"
												color="warning"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="lastName"
								rules={{
									required: 'Last Name is required. Minimum 6 characters',
									minLength: 6,
								}}
								render={({field, fieldState}) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												type="text"
												id="lastName"
												placeholder="Last Name"
												color="warning"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={control}
							name="email"
							rules={{
								required: 'Email is required.',
							}}
							render={({field, fieldState}) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type="email"
											id="email"
											placeholder="Email"
											color="warning"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="password"
							rules={{
								required: 'Password is required.',
								minLength: 6,
							}}
							render={({field, fieldState}) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											type={isVisible ? 'text' : 'password'}
											id="password"
											placeholder="Password"
											color="warning"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="role"
							rules={{
								required: 'Role is required.',
							}}
							render={({field, fieldState}) => (
								<FormItem>
									<FormControl>
										<Select>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a role" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem key="student" value="student">
														Student
													</SelectItem>
													<SelectItem key="teacher" value="teacher">
														Teacher
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<p className="text-gray-600 mt-4 float-right">
							Already have an account?{' '}
							<Link className="text-orange-400" to="/login">
								Sign In
							</Link>
						</p>
						<Button size="lg" type="submit">
							{user?.status === 'loading' ? 'Loading...' : 'Register'}
						</Button>
					</div>
				</form>
			</Form>
		</WrapperAuth>
	);
};
