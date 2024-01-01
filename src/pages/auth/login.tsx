import {FC, useState} from 'react';
import {Button, Input} from '@nextui-org/react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {WrapperAuth} from './wrapper.tsx';
import {Link} from 'react-router-dom';
export const Login: FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	return (
		<>
			<WrapperAuth>
				<form className="w-8/12 mx-auto">
					<h2 className="text-4xl font-bold text-center text-amber-400 mb-8">
						Login
					</h2>
					<div className="flex flex-col gap-4">
						<Input
							type="text"
							id="name"
							name="name"
							label="Name"
							radius="full"
							color="warning"
							labelPlacement="inside"
						/>
						<Input
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
							id="password"
							name="password"
							label="Password"
							radius="full"
							color="warning"
							labelPlacement="inside"
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
							Sign In
						</Button>
					</div>
				</form>
			</WrapperAuth>
		</>
	);
};
