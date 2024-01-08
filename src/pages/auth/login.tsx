import {FC, useEffect, useState} from 'react';
import {Button, Input} from '@nextui-org/react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {WrapperAuth} from './wrapper.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {ILogin} from '../../redux/models/index.ts';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/index.ts';
import {
	getError,
	getStatus,
	loginUser,
	selectUser,
} from '../../redux/features/auth/userSlice.ts';
export const Login: FC = () => {
	const {control, handleSubmit} = useForm<ILogin>({
		mode: 'onSubmit',
		defaultValues: {
			email: '',
			password: '',
		},
	});
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
				<form
					onSubmit={handleSubmit(handleUserLogin)}
					className="w-8/12 mx-auto"
				>
					<h2 className="text-4xl font-bold text-center text-amber-400 mb-8">
						Login
					</h2>
					<div className="flex flex-col gap-4">
						<Controller
							control={control}
							name="email"
							rules={{
								required: 'Email is required.',
							}}
							render={({field, fieldState}) => (
								<Input
									{...field}
									isInvalid={fieldState.invalid}
									errorMessage={fieldState.error?.message}
									type="email"
									id="email"
									label="Email"
									radius="full"
									color="warning"
									labelPlacement="inside"
								/>
							)}
						/>
						<Controller
							control={control}
							name="password"
							rules={{
								required: 'Password is required.',
								minLength: 6,
							}}
							render={({field, fieldState}) => (
								<Input
									{...field}
									isInvalid={fieldState.invalid}
									errorMessage={fieldState.error?.message}
									endContent={
										<button
											className="focus:outline-none"
											type="button"
											onClick={toggleVisibility}
										>
											{isVisible ? (
												<FaEye className="text-2xl text-default-400 pointer-events-none" />
											) : (
												<FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
											)}
										</button>
									}
									type={isVisible ? 'text' : 'password'}
									label="Password"
									radius="full"
									color="warning"
									labelPlacement="inside"
								/>
							)}
						/>
						<p className="text-gray-600 mt-4 float-right">
							Don't have an account?{' '}
							<Link className="text-amber-400" to="/register">
								Sign Up
							</Link>
						</p>
						<Button
							size="lg"
							type="submit"
							radius="full"
							className="
								shadow-md
								shadow-amber-400
								bg-amber-400 w-full hover:bg-amber-500 text-white font-bold py-2 px-4"
						>
							{status === 'loading' ? 'Loading...' : 'Sign In'}
						</Button>
					</div>
				</form>
			</WrapperAuth>
		</>
	);
};
