import {WrapperAuth} from './wrapper.tsx';
import {FC, useState} from 'react';
import {Button, cn, Input, Radio, Select, SelectItem} from '@nextui-org/react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {Link} from 'react-router-dom';

// @ts-ignore
export const CustomRadio = (props) => {
	const {children, ...otherProps} = props;

	return (
		<Radio
			{...otherProps}
			color="warning"
			classNames={{
				base: cn(
					'w-full inline-flex m-0 bg-amber-50 hover:bg-amber-100 items-center justify-between',
					'flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
					'data-[selected=true]:border-warning'
				),
			}}
		>
			{children}
		</Radio>
	);
};
export const Register: FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	return (
		<WrapperAuth>
			<form className="w-8/12 mx-auto">
				<h2 className="text-4xl font-bold text-center text-amber-400 mb-8">
					Register
				</h2>
				<p className="text-gray-600 mt-4 text-center mb-4">
					Please create new account here{' '}
				</p>
				<div className="flex flex-col gap-4">
					<Input
						type="text"
						id="firstName"
						name="firstName"
						label="First Name"
						radius="full"
						color="warning"
						labelPlacement="inside"
					/>
					<Input
						type="text"
						id="lastName"
						name="lastName"
						label="Last Name"
						radius="full"
						color="warning"
						labelPlacement="inside"
					/>
					<Input
						type="text"
						id="email"
						name="email"
						label="Email"
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
					<Select
						key="role"
						radius="full"
						label="Role"
						labelPlacement="inside"
						className="max-w-[100%]"
						color="warning"
					>
						<SelectItem key="student" value="student">
							Student
						</SelectItem>
						<SelectItem key="teacher" value="teacher">
							Teacher
						</SelectItem>
					</Select>
					<p className="text-gray-600 mt-4 float-right">
						Already have an account?{' '}
						<Link className="text-amber-400" to="/login">
							Sign In
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
						Sign Up
					</Button>
				</div>
			</form>
		</WrapperAuth>
	);
};
