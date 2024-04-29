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
import {getBlobUrlWithSasToken, LocalStorageManager} from '@/lib/utils';
import {IUpdateUser} from '@/redux/models';
import {toast} from 'sonner';
import {updateProfileFx} from '@/api';
import {useDispatch} from 'react-redux';
import {loginUserSuccessAction} from '@/redux/features/users/slice';

export const Profile = () => {
	const l = LocalStorageManager.getInstance();
	const dispatch = useDispatch();
	const form = useForm<IUpdateUser>({
		mode: 'onChange',
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			avatarUrl: '',
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
	const onSubmit = async (data: IUpdateUser) => {
		try {
			toast.loading('Updating profile...');
			const userData: IUpdateUser = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				avatarUrl: data.avatarUrl,
			};
			const res = await updateProfileFx(userData);
			const u = l.getItem('user');
			l.setItem('user', JSON.stringify({...u, ...userData}));
			dispatch(loginUserSuccessAction({...u, ...userData}));
			toast.dismiss();
			if (res) {
				toast.info(res);
			}
		} catch (e: any) {
			toast.error(e.message);
		}
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
