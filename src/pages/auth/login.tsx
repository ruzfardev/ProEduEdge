import {FC, useEffect, useState} from 'react';
import {
	Button,
	Input,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../components/ui';
import {WrapperAuth} from './wrapper.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
import {ILogin} from '../../redux/models/index.ts';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/index.ts';
import {
	getError,
	getStatus,
	loginUser,
} from '../../redux/features/auth/userSlice.ts';
export const Login: FC = () => {
	const form = useForm<ILogin>({
		mode: 'onSubmit',
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const {control, handleSubmit} = form;
	const dispatch = useAppDispatch();
	const err = useAppSelector(getError);
	const status = useAppSelector(getStatus);
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleUserLogin: SubmitHandler<ILogin> = (data: ILogin) => {
		try {
			dispatch(loginUser({...data}));
			if (status === 'idle') {
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};
	const navigate = useNavigate();
	useEffect(() => {}, [err, status]);
	return (
		<>
			<WrapperAuth>
				<Form {...form}>
					<form
						onSubmit={handleSubmit(handleUserLogin)}
						className="w-8/12 mx-auto"
					>
						<h2 className="text-4xl font-bold text-center text-orange-400 mb-8">
							Login
						</h2>
						<div className="flex flex-col gap-4">
							<FormField
								control={form.control}
								name="email"
								rules={{
									required: 'Email is required.',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
										message: 'Invalid email address',
									},
								}}
								render={({field}) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Enter your email"
												type="email"
												id="email"
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
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter your password"
												{...field}
												type={isVisible ? 'text' : 'password'}
												color="warning"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<p className="text-gray-600 mt-4 float-right">
								Don't have an account?{' '}
								<Link className="text-orange-400" to="/register">
									Sign Up
								</Link>
							</p>
							<Button size="lg" type="submit">
								{status === 'loading' ? 'Loading...' : 'Sign In'}
							</Button>
						</div>
					</form>
				</Form>
			</WrapperAuth>
		</>
	);
};
