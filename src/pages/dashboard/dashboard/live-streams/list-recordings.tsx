import React, {useEffect} from 'react';
import {
	Badge,
	Button,
	DialogClose,
	DialogTrigger,
	Separator,
} from '@/components/ui';
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
import {deleteMeetingFx, getMeetingRecordingsFx, updateMeetingFx} from '@/api';
import {generateRecordingUrl, getBlobUrlWithSasToken} from '@/lib/utils';
import {Meeting} from '@/redux/features/course/types';
import {ConfirmationDialog} from '@/components/confirmation-dialog';

export const ListOfRecordings = () => {
	const closeBtnRef = React.useRef<HTMLButtonElement>(null);
	const dispatch = useDispatch();
	const {data, errors, isLoading} = useAppSelector(
		(state) => state.courses.meetings
	);
	const {user} = useAppSelector((state) => state.users);
	useEffect(() => {
		dispatch(getMeetingsAction());
	}, []);

	const refreshMeetings = () => {
		dispatch(getMeetingsAction());
	};
	const handleJoinMeeting = (roomId: string) => {
		const info = {
			role: 'student',
			courseId: null,
			instructorId: user.data?.id,
			roomId: roomId,
		};
		const toJSONString = JSON.stringify(info);
		const toBase64 = btoa(toJSONString);
		window.open(`http://localhost:3000/${toBase64}`, '_blank');
	};

	const handleDownloadRecording = async (roomId: string) => {
		try {
			toast.loading('Downloading recording...');
			const path = await getMeetingRecordingsFx(roomId);
			const url = generateRecordingUrl(path);
			console.log(url);
			const a = document.createElement('a');
			a.href = getBlobUrlWithSasToken(url, 'recordings');
			a.download = 'recording.mp4';
			a.target = '_blank';
			a.click();
			toast.dismiss();
			toast.success('Recording downloaded successfully');
		} catch (error: any) {
			toast.dismiss();
			toast.error(error.message);
		}
	};
	const handleDeleteMeeting = async (meeting: Meeting) => {
		try {
			await deleteMeetingFx(meeting.id);
			dispatch(getMeetingsAction());
			closeBtnRef.current?.click();
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div className="relative min-h-[500px]">
			<div className="table-header flex justify-between items-center">
				{user.data && user.data.role === 'teacher' && <CreateMeetingDialog />}
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
						{user.data && user.data.role === 'student' && (
							<TableHead className="w-[200px]">Join</TableHead>
						)}
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				{!isLoading && data && (
					<TableBody>
						{data.map((meeting, index) => (
							<TableRow key={index}>
								<TableCell className="font-medium">{index + 1}</TableCell>
								<TableCell>
									<Badge
										variant="outline"
										className={`${meeting.isActive ? 'text-green-500' : 'text-red-500'} px-2 text-md`}
									>
										{meeting.isActive ? 'Active' : 'Inactive'}
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
								{user.data && user.data.role === 'student' && (
									<TableCell>
										<Button
											onClick={() => handleJoinMeeting(meeting.roomId)}
											className="p-2 w-20 h-8"
										>
											Join
											<RocketIcon className="w-4 h-4 ml-2" />
										</Button>
									</TableCell>
								)}
								<TableCell className="text-right flex gap-1 justify-end">
									<Button
										onClick={() => handleDownloadRecording(meeting.roomId)}
										className="p-1 w-8 h-8"
										variant="outline"
									>
										<DownloadIcon className="w-4 h-4" />
									</Button>
									<ConfirmationDialog
										title="Delete Recording"
										description="Are you sure you want to delete this recording?"
										trigger={
											<>
												<DialogTrigger asChild>
													<Button className="p-1 w-8 h-8" variant="outline">
														<TrashIcon className="w-4 h-4" />
													</Button>
												</DialogTrigger>
												<DialogClose asChild>
													<Button
														ref={closeBtnRef}
														type="button"
														className="hidden block w-full mt-2"
														variant="outline"
														style={{display: 'none', visibility: 'hidden'}}
													>
														Cancel
													</Button>
												</DialogClose>
											</>
										}
										onConfirm={() => {
											handleDeleteMeeting(meeting);
										}}
									/>
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
