import {WrapperAuth} from './wrapper.tsx';
import {FC, useState} from 'react';
import {Button, Input, Select, SelectItem} from '@nextui-org/react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {FilePond} from 'react-filepond';
import {FilePondFile} from 'filepond';
import './style.scss';

export const Register: FC = () => {
	const [avatar, setAvatar] = useState<FilePondFile[]>();
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	return (
		<WrapperAuth>
			<form className="w-8/12 mx-auto">
				<h2 className="text-4xl font-bold text-center text-amber-400 mb-8">
					Register
				</h2>
				<div>
					<FilePond
						acceptedFileTypes={['image/*']}
						oninit={() => {}}
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
