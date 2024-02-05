import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Card,
} from '@/components/ui';
import {Pencil2Icon} from '@radix-ui/react-icons';
import React from 'react';

export const DiscussionChat = () => {
	return (
		<Card className="chat-card flex h-full">
			<div className="chat-list border-r-zinc-200 border-r flex flex-col space-y-1 w-1/3">
				<div className="chat-header p-2 border-b px-4 flex space-x-4">
					<div className="chat-avatar w-full flex items-center">
						<Avatar>
							<AvatarImage
								src="https://i.pravatar.cc/500?img=32"
								alt="Avatar"
							/>
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<Button
							className="ml-auto"
							size="default"
							variant="ghost"
							color="warning"
						>
							<Pencil2Icon />
						</Button>
					</div>
				</div>
				<div
					className="chat-list  
                 max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar
                flex flex-col"
				>
					<div
						className="chat-list-item
                    hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
                    flex items-center space-x-4 p-4 py-2"
					>
						<Avatar>
							{/* <AvatarImage src="FF" alt="Avatar" /> */}
							<AvatarFallback className="border border-orange-500 bg-orange-200">
								JD
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col overflow-hidden">
							<div className="flex items-center space-x-2">
								<span className="font-semibold">John Doe</span>
								<span className="text-xs text-gray-500">10:30 AM</span>
							</div>
							<div className="text-sm text-gray-500 truncate text-ellipsis ">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</div>
						</div>
					</div>
					<div
						className="chat-list-item
                    hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
                    flex items-center space-x-4 p-4 py-2"
					>
						<Avatar>
							{/* <AvatarImage src="FF" alt="Avatar" /> */}
							<AvatarFallback className="border border-orange-500 bg-orange-200">
								JD
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col overflow-hidden">
							<div className="flex items-center space-x-2">
								<span className="font-semibold">John Doe</span>
								<span className="text-xs text-gray-500">10:30 AM</span>
							</div>
							<div className="text-sm text-gray-500 truncate text-ellipsis ">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</div>
						</div>
					</div>
					<div
						className="chat-list-item
                    hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
                    flex items-center space-x-4 p-4 py-2"
					>
						<Avatar>
							{/* <AvatarImage src="FF" alt="Avatar" /> */}
							<AvatarFallback className="border border-orange-500 bg-orange-200">
								JD
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col overflow-hidden">
							<div className="flex items-center space-x-2">
								<span className="font-semibold">John Doe</span>
								<span className="text-xs text-gray-500">10:30 AM</span>
							</div>
							<div className="text-sm text-gray-500 truncate text-ellipsis ">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</div>
						</div>
					</div>
					<div
						className="chat-list-item
                    hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
                    flex items-center space-x-4 p-4 py-2"
					>
						<Avatar>
							{/* <AvatarImage src="FF" alt="Avatar" /> */}
							<AvatarFallback className="border border-orange-500 bg-orange-200">
								JD
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col overflow-hidden">
							<div className="flex items-center space-x-2">
								<span className="font-semibold">John Doe</span>
								<span className="text-xs text-gray-500">10:30 AM</span>
							</div>
							<div className="text-sm text-gray-500 truncate text-ellipsis ">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</div>
						</div>
					</div>
					<div
						className="chat-list-item
                    hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
                    flex items-center space-x-4 p-4 py-2"
					>
						<Avatar>
							{/* <AvatarImage src="FF" alt="Avatar" /> */}
							<AvatarFallback className="border border-orange-500 bg-orange-200">
								JD
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col overflow-hidden">
							<div className="flex items-center space-x-2">
								<span className="font-semibold">John Doe</span>
								<span className="text-xs text-gray-500">10:30 AM</span>
							</div>
							<div className="text-sm text-gray-500 truncate text-ellipsis ">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</div>
						</div>
					</div>
					<div
						className="chat-list-item
                    hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer
                    flex items-center space-x-4 p-4 py-2"
					>
						<Avatar>
							{/* <AvatarImage src="FF" alt="Avatar" /> */}
							<AvatarFallback className="border border-orange-500 bg-orange-200">
								JD
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col overflow-hidden">
							<div className="flex items-center space-x-2">
								<span className="font-semibold">John Doe</span>
								<span className="text-xs text-gray-500">10:30 AM</span>
							</div>
							<div className="text-sm text-gray-500 truncate text-ellipsis ">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="chat flex flex-col w-2/3">
				<div className="chat-header p-2 border-b px-4 flex space-x-4">
					<div className="chat-avatar w-full flex items-center">
						<Avatar>
							{/* <AvatarImage src="FF" alt="Avatar" /> */}
							<AvatarFallback className="border border-orange-500 bg-orange-200">
								JD
							</AvatarFallback>
						</Avatar>
					</div>
				</div>
				<div
					className="chat-content 
                max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar
                flex flex-col"
				>
					<div className="chat-message flex flex-col p-4">
						<div className="flex items-center space-x-2">
							<span className="font-semibold">John Doe</span>
							<span className="text-xs text-gray-500">10:30 AM</span>
						</div>
						<div className="text-sm text-gray-500">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
							auctor, tortor in iaculis dapibus, purus odio tincidunt sem, ac
							tincidunt nisl turpis vitae libero
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};
