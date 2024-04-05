import React from 'react';
import {Badge, Button, Separator} from '@/components/ui';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	CopyIcon,
	DownloadIcon,
	EyeOpenIcon,
	RocketIcon,
	TrashIcon,
} from '@radix-ui/react-icons';
import {toast} from 'sonner';
import {BiRefresh} from 'react-icons/bi';

export const ListOfRecordings = () => {
	// @ts-ignore
	return (
		<div>
			<div className="table-header flex justify-between items-center">
				<Button variant="default">
					Launch Meeting
					<RocketIcon className="w-4 h-4 ml-2" />
				</Button>
				<Button variant="outline">
					Refresh
					<BiRefresh className="w-4 h-4 ml-2" />
				</Button>
			</div>
			<Separator className="mt-3" />
			<Table className="mt-3 ">
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="w-[200px]">Room ID</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">1</TableCell>
						<TableCell>
							<Badge variant="outline" className="text-green-500">
								Active
							</Badge>
						</TableCell>
						<TableCell>
							<Badge
								variant="outline"
								className="text-blue-500 p-1 px-2 text-md flex items-center justify-between"
							>
								123456
								<CopyIcon
									onClick={() => {
										navigator.clipboard.writeText('123456').then(() => {
											toast.success('Copied to clipboard');
										});
									}}
									className="w-4 h-4 cursor-pointer"
								/>
							</Badge>
						</TableCell>
						<TableCell className="text-right flex gap-1 justify-end">
							<Button className="p-1 w-8 h-8" variant="outline">
								<DownloadIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<TrashIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<EyeOpenIcon className="w-4 h-4" />
							</Button>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">1</TableCell>
						<TableCell>
							<Badge variant="outline" className="text-green-500">
								Active
							</Badge>
						</TableCell>
						<TableCell>
							<Badge
								variant="outline"
								className="text-blue-500 p-1 px-2 text-md flex items-center justify-between"
							>
								123456
								<CopyIcon
									onClick={() => {
										navigator.clipboard.writeText('123456').then(() => {
											toast.success('Copied to clipboard');
										});
									}}
									className="w-4 h-4 cursor-pointer"
								/>
							</Badge>
						</TableCell>
						<TableCell className="text-right flex gap-1 justify-end">
							<Button className="p-1 w-8 h-8" variant="outline">
								<DownloadIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<TrashIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<EyeOpenIcon className="w-4 h-4" />
							</Button>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">1</TableCell>
						<TableCell>
							<Badge variant="outline" className="text-green-500">
								Active
							</Badge>
						</TableCell>
						<TableCell>
							<Badge
								variant="outline"
								className="text-blue-500 p-1 px-2 text-md flex items-center justify-between"
							>
								123456
								<CopyIcon
									onClick={() => {
										navigator.clipboard.writeText('123456').then(() => {
											toast.success('Copied to clipboard');
										});
									}}
									className="w-4 h-4 cursor-pointer"
								/>
							</Badge>
						</TableCell>
						<TableCell className="text-right flex gap-1 justify-end">
							<Button className="p-1 w-8 h-8" variant="outline">
								<DownloadIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<TrashIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<EyeOpenIcon className="w-4 h-4" />
							</Button>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">1</TableCell>
						<TableCell>
							<Badge variant="outline" className="text-green-500">
								Active
							</Badge>
						</TableCell>
						<TableCell>
							<Badge
								variant="outline"
								className="text-blue-500 p-1 px-2 text-md flex items-center justify-between"
							>
								123456
								<CopyIcon
									onClick={() => {
										navigator.clipboard.writeText('123456').then(() => {
											toast.success('Copied to clipboard');
										});
									}}
									className="w-4 h-4 cursor-pointer"
								/>
							</Badge>
						</TableCell>
						<TableCell className="text-right flex gap-1 justify-end">
							<Button className="p-1 w-8 h-8" variant="outline">
								<DownloadIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<TrashIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<EyeOpenIcon className="w-4 h-4" />
							</Button>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">1</TableCell>
						<TableCell>
							<Badge variant="outline" className="text-green-500">
								Active
							</Badge>
						</TableCell>
						<TableCell>
							<Badge
								variant="outline"
								className="text-blue-500 p-1 px-2 text-md flex items-center justify-between"
							>
								123456
								<CopyIcon
									onClick={() => {
										navigator.clipboard.writeText('123456').then(() => {
											toast.success('Copied to clipboard');
										});
									}}
									className="w-4 h-4 cursor-pointer"
								/>
							</Badge>
						</TableCell>
						<TableCell className="text-right flex gap-1 justify-end">
							<Button className="p-1 w-8 h-8" variant="outline">
								<DownloadIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<TrashIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<EyeOpenIcon className="w-4 h-4" />
							</Button>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">1</TableCell>
						<TableCell>
							<Badge variant="outline" className="text-green-500">
								Active
							</Badge>
						</TableCell>
						<TableCell>
							<Badge
								variant="outline"
								className="text-blue-500 p-1 px-2 text-md flex items-center justify-between"
							>
								123456
								<CopyIcon
									onClick={() => {
										navigator.clipboard.writeText('123456').then(() => {
											toast.success('Copied to clipboard');
										});
									}}
									className="w-4 h-4 cursor-pointer"
								/>
							</Badge>
						</TableCell>
						<TableCell className="text-right flex gap-1 justify-end">
							<Button className="p-1 w-8 h-8" variant="outline">
								<DownloadIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<TrashIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<EyeOpenIcon className="w-4 h-4" />
							</Button>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">1</TableCell>
						<TableCell>
							<Badge variant="outline" className="text-green-500">
								Active
							</Badge>
						</TableCell>
						<TableCell>
							<Badge
								variant="outline"
								className="text-blue-500 p-1 px-2 text-md flex items-center justify-between"
							>
								123456
								<CopyIcon
									onClick={() => {
										navigator.clipboard.writeText('123456').then(() => {
											toast.success('Copied to clipboard');
										});
									}}
									className="w-4 h-4 cursor-pointer"
								/>
							</Badge>
						</TableCell>
						<TableCell className="text-right flex gap-1 justify-end">
							<Button className="p-1 w-8 h-8" variant="outline">
								<DownloadIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<TrashIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<EyeOpenIcon className="w-4 h-4" />
							</Button>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">1</TableCell>
						<TableCell>
							<Badge variant="outline" className="text-green-500">
								Active
							</Badge>
						</TableCell>
						<TableCell>
							<Badge
								variant="outline"
								className="text-blue-500 p-1 px-2 text-md flex items-center justify-between"
							>
								123456
								<CopyIcon
									onClick={() => {
										navigator.clipboard.writeText('123456').then(() => {
											toast.success('Copied to clipboard');
										});
									}}
									className="w-4 h-4 cursor-pointer"
								/>
							</Badge>
						</TableCell>
						<TableCell className="text-right flex gap-1 justify-end">
							<Button className="p-1 w-8 h-8" variant="outline">
								<DownloadIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<TrashIcon className="w-4 h-4" />
							</Button>
							<Button className="p-1 w-8 h-8" variant="outline">
								<EyeOpenIcon className="w-4 h-4" />
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};
