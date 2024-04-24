import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Card,
	Form,
	FormField,
	FormItem,
	FormLabel,
	Input,
	Label,
} from '@/components/ui';
import {useAppSelector} from '@/redux/hooks';
import React from 'react';
import {useForm} from 'react-hook-form';
import {getBlobUrlWithSasToken} from '@/lib/utils';

export const Profile = () => {
	const form = useForm({
		mode: 'onChange',
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
		},
	});
	const {control, handleSubmit} = form;
	const {
		user: {data, errors, isLoading},
	} = useAppSelector((state) => state.users);

	// if there is user data set it as default values
	React.useEffect(() => {
		if (data) {
			form.reset(data);
		}
	}, [data]);
	const onSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-2 justify-center items-center">
				<Card className="w-5/12 mx-auto flex flex-col gap-2 justify-center items-center p-6">
					<Avatar className="w-40 h-40">
						<AvatarImage
							src={getBlobUrlWithSasToken(data?.avatarUrl, 'avatar')}
							alt="John Doe"
						/>
						<AvatarFallback className="border text-4xl border-orange-500 bg-orange-500 text-white">
							{data?.firstName[0]}
							{data?.lastName[0]}
						</AvatarFallback>
					</Avatar>
					<h1 className="text-2xl font-bold">
						{data?.firstName} {data?.lastName}
					</h1>
					<p className="text-orange-500 capitalize">{data?.role}</p>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)} className="w-full">
							<FormField
								control={control}
								name="firstName"
								render={({field}) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<Input
											{...field}
											type="text"
											placeholder="Enter your name"
										/>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="lastName"
								render={({field}) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<Input
											{...field}
											type="text"
											placeholder="Enter your name"
										/>
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="email"
								render={({field}) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<Input
											{...field}
											type="email"
											placeholder="Enter your email"
										/>
									</FormItem>
								)}
							/>
							<Button className="w-full mt-4">Save</Button>
						</form>
					</Form>
				</Card>
			</div>
		</div>
	);
};
