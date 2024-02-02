import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Card,
	Input,
	Label,
} from '@/components/ui';
import React from 'react';

export const Profile = () => {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-2 justify-center items-center">
				<Card className="w-5/12 mx-auto flex flex-col gap-2 justify-center items-center p-6">
					<Avatar className="w-40 h-40">
						<AvatarImage src="https://i.pravatar.cc/500?img=32" />
						<AvatarFallback>JH</AvatarFallback>
					</Avatar>
					<h1 className="text-2xl font-bold">John Doe</h1>
					<p className="text-gray-400">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
						voluptatem?
					</p>
					<form className="w-full">
						<Label>First Name</Label>
						<Input type="text" placeholder="Enter your name" value="John" />
						<Label>Last Name</Label>
						<Input type="text" placeholder="Enter your name" value="Doe" />
						<Label>Email</Label>
						<Input
							type="email"
							placeholder="Enter your email"
							value="email@gmail.com"
						/>
						<Label>Password</Label>
						<Input
							type="password"
							placeholder="Enter your password"
							value="password"
						/>
						<Button className="w-full mt-4">Save</Button>
					</form>
				</Card>
			</div>
		</div>
	);
};
