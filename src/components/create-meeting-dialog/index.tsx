import React, {FC, FormEvent} from 'react';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog';
import {CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {Button, FormControl} from '@/components/ui';
import {FaCreditCard, FaPaypal} from 'react-icons/fa';
import {FaCartShopping} from 'react-icons/fa6';
import {toast} from 'sonner';
import {enrollCourseFx, payForCourseFx} from '@/api';
import {LocalStorageManager} from '@/lib/utils';
import {useAppSelector} from '@/redux/hooks';
import {Loading} from '@/components/loader';
import {useNavigate} from 'react-router';
import {RocketIcon} from '@radix-ui/react-icons';
export const CreateMeetingDialog: FC = () => {
	const [selectedCourseId, setSelectedCourseId] = React.useState<string>('');
	const {user} = useAppSelector((state) => state.users);
	const {
		myCourses: {data, isLoading, errors},
	} = useAppSelector((state) => state.instructor);
	const navigate = useNavigate();
	const handleCourseCreation = async () => {
		const info = {
			role: 'instructor',
			courseId: selectedCourseId,
			instructorId: user.data?.id,
			roomId: '',
		};
		const toJSONString = JSON.stringify(info);
		const toBase64 = btoa(toJSONString);
		window.open(`http://localhost:3000/${toBase64}`, '_blank');
	};
	return (
		<Dialog>
			<DialogTrigger className="p-2 bg-orange-500 text-white rounded-md px-3">
				Create Meeting
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>Create a new meeting</DialogHeader>
				<Select
					onValueChange={(value) => {
						setSelectedCourseId(value);
					}}
					disabled={isLoading}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a course" />
					</SelectTrigger>
					<SelectContent>
						{data?.map((category) => (
							<SelectItem key={category.id} value={category.id.toString()}>
								{category.title}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<DialogFooter>
					<Button
						disabled={!selectedCourseId}
						className="w-full"
						onClick={handleCourseCreation}
					>
						Launch Meeting
						<RocketIcon className="w-4 h-4 ml-2" />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
