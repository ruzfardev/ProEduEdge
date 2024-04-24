import {useForm} from 'react-hook-form';
import {
	Button,
	Card,
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components/ui';
import React from 'react';
import {EyeClosedIcon, EyeOpenIcon} from '@radix-ui/react-icons';
import {IChangePassword} from '@/redux/models';
import {changePassword} from '@/api';

export const Settings = () => {
	const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
	const [showNewPassword, setShowNewPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
	const form = useForm<IChangePassword>({
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
		mode: 'onChange',
	});
	const {handleSubmit, control} = form;

	const handleUpdatePassword = async (data: IChangePassword) => {
		try {
			await changePassword(data);
			form.reset();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Card className="w-5/12 p-6 space-y-4 mx-auto">
			<div className="flex flex-col space-y-2">
				<h1 className="text-2xl font-bold">Change Password</h1>
				<p className="text-gray-500">
					Ensure your account is using a long, random password to stay secure.
				</p>
			</div>
			<Form {...form}>
				<form onSubmit={handleSubmit(handleUpdatePassword)}>
					<div className="flex flex-col space-y-2">
						<FormField
							control={control}
							name="currentPassword"
							rules={{
								required: {
									value: true,
									message: 'Current password is required',
								},
							}}
							render={({field}) => (
								<FormItem>
									<FormLabel>Current Password</FormLabel>
									<div className="flex items-center space-x-2 relative">
										<Input
											{...field}
											type={showCurrentPassword ? 'text' : 'password'}
											placeholder="Enter your current password"
										/>
										<span className="w-6 h-6 flex items-center justify-center absolute right-2">
											{showCurrentPassword ? (
												<EyeOpenIcon
													onClick={() => setShowCurrentPassword(false)}
												/>
											) : (
												<EyeClosedIcon
													onClick={() => setShowCurrentPassword(true)}
												/>
											)}
										</span>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={control}
						name="newPassword"
						rules={{
							required: {value: true, message: 'New password is required'},
							minLength: {
								value: 6,
								message: 'Password must be at least 6 characters',
							},
							pattern: {
								value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
								message:
									'Password must contain at least one uppercase letter, one lowercase letter, and one number',
							},
						}}
						render={({field}) => (
							<FormItem>
								<FormLabel>New Password</FormLabel>
								<div className="flex items-center space-x-2 relative">
									<Input
										{...field}
										type={showNewPassword ? 'text' : 'password'}
										placeholder="Enter your new password"
									/>
									<span className="w-6 h-6 flex items-center justify-center absolute right-2">
										{showNewPassword ? (
											<EyeOpenIcon onClick={() => setShowNewPassword(false)} />
										) : (
											<EyeClosedIcon onClick={() => setShowNewPassword(true)} />
										)}
									</span>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="confirmPassword"
						rules={{
							validate: (value) => {
								if (value === form.getValues().newPassword) {
									return true;
								} else {
									return 'Passwords do not match';
								}
							},
						}}
						render={({field}) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<div className="flex items-center space-x-2 relative">
									<Input
										{...field}
										type={showConfirmPassword ? 'text' : 'password'}
										placeholder="Enter your new password"
									/>
									<span className="w-6 h-6 flex items-center justify-center absolute right-2">
										{showConfirmPassword ? (
											<EyeOpenIcon
												onClick={() => setShowConfirmPassword(false)}
											/>
										) : (
											<EyeClosedIcon
												onClick={() => setShowConfirmPassword(true)}
											/>
										)}
									</span>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-full mt-4">Change Password</Button>
				</form>
			</Form>
		</Card>
	);
};
