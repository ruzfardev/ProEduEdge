import React, {useEffect} from 'react';
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
import {useAppSelector} from '@/redux/hooks';
import {CreateMeetingDialog} from '@/components/create-meeting-dialog';
import {useDispatch} from 'react-redux';
import {getMeetingsAction} from '@/redux/features/course/slice';
import {Loading} from '@/components/loader';

export const ListOfRecordings = () => {
	const dispatch = useDispatch();
	const {data, errors, isLoading} = useAppSelector(
		(state) => state.courses.meetings
	);
	useEffect(() => {
		dispatch(getMeetingsAction());
	}, []);

	const refreshMeetings = () => {
		dispatch(getMeetingsAction());
	};

	return (
		<div className="relative min-h-[500px]">
			<div className="table-header flex justify-between items-center">
				<CreateMeetingDialog />
				<Button onClick={refreshMeetings} variant="outline">
					Refresh
					<BiRefresh className="w-4 h-4 ml-2" />
				</Button>
			</div>
			<Separator className="mt-3" />
			{isLoading && <div className="text-center">Loading...</div>}
			<Table className="mt-3 ">
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="w-[200px]">Room ID</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				{!isLoading && data && (
					<TableBody>
						{data.map((meeting, index) => (
							<TableRow key={index}>
								<TableCell className="font-medium">{index + 1}</TableCell>
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
										{meeting.roomId}
										<CopyIcon
											onClick={() => {
												navigator.clipboard
													.writeText(meeting.roomId)
													.then(() => {
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
						))}
					</TableBody>
				)}
			</Table>
		</div>
	);
};
