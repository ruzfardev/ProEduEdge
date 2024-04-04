import React, {FC, FormEvent} from 'react';
import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog';
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
import {Button} from '@/components/ui';
import {FaCreditCard, FaPaypal} from 'react-icons/fa';
import {FaCartShopping} from 'react-icons/fa6';
import {toast} from 'sonner';
import {enrollCourseFx, payForCourseFx} from '@/api';
import {LocalStorageManager} from '@/lib/utils';
import {useAppSelector} from '@/redux/hooks';
import {Loading} from '@/components/loader';
import {useNavigate} from 'react-router';
interface IEnrollDialogProps {
	amount: number;
	courseId: string;
}
export const EnrollDialog: FC<IEnrollDialogProps> = ({amount, courseId}) => {
	const {
		user: {data},
	} = useAppSelector((state) => state.users);
	const [paymentMethod, setPaymentMethod] = React.useState('card');
	const [isLoading, setIsLoading] = React.useState(false);
	const navigate = useNavigate();
	const handleEnroll = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!data) {
			toast.error('You need to login to enroll in a course');
			return;
		} else {
			try {
				setIsLoading(true);
				const id = Number(courseId);
				const userId = Number(data.id);
				const pay = await payForCourseFx({
					courseId: id,
					amount,
					paymentType: paymentMethod,
					userId: userId,
				});
				const res = await enrollCourseFx({
					courseId: id,
					userId: userId,
					status: 'enrolled',
				});
				console.info(res, pay);
				setTimeout(() => {
					setIsLoading(false);
					toast.success('You have successfully enrolled in the course');
					navigate(`/dashboard`);
				}, 2000);
			} catch (error) {
				setIsLoading(false);
				toast.error('An error occurred while processing your payment');
			}
		}
	};
	return (
		<Dialog>
			<DialogTrigger
				className="bg-white text-orange-500 rounded-full px-12 py-4
					hover:bg-white transition-all duration-500 ease-in-out
					"
			>
				Enroll Now
			</DialogTrigger>
			<DialogContent>
				<CardHeader className="p-0">
					<div className="text-orange-500 flex gap-3 items-center border-2 border border-zinc-100 text-center p-2 mt-4 rounded">
						<FaCartShopping className="text-orange-500" />
						<p className="text-zinc-500">
							Total amount to be paid for the course is{' '}
						</p>
						<span className="text-orange-500 ml-auto">${amount} USD</span>
					</div>
				</CardHeader>
				<CardContent className="grid gap-6 p-0 relative">
					{isLoading && (
						<div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80">
							<Loading />
						</div>
					)}
					<CardTitle>Payment Method</CardTitle>
					<RadioGroup
						onValueChange={(e) => setPaymentMethod(e)}
						defaultValue="card"
						className="grid grid-cols-2 gap-4"
					>
						<div>
							<RadioGroupItem value="card" id="card" className="peer sr-only" />
							<Label
								htmlFor="card"
								className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
							>
								<FaCreditCard className="mb-3 h-6 w-6" />
								Card
							</Label>
						</div>
						<div>
							<RadioGroupItem
								value="paypal"
								id="paypal"
								className="peer sr-only"
							/>
							<Label
								htmlFor="paypal"
								className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
							>
								<FaPaypal className="mb-3 h-6 w-6" />
								Paypal
							</Label>
						</div>
					</RadioGroup>
					<form className="flex flex-col gap-3" onSubmit={handleEnroll}>
						{paymentMethod === 'card' && (
							<>
								<div className="grid gap-2">
									<Label htmlFor="name">Name</Label>
									<Input required id="name" placeholder="First Last Name" />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="number">Card number</Label>
									<Input
										id="number"
										required
										placeholder="7777 7777 7777 7777"
									/>
								</div>
								<div className="grid grid-cols-3 gap-4">
									<div className="grid gap-2">
										<Label htmlFor="month">Expires</Label>
										<Select>
											<SelectTrigger id="month">
												<SelectValue placeholder="Month" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="1">January</SelectItem>
												<SelectItem value="2">February</SelectItem>
												<SelectItem value="3">March</SelectItem>
												<SelectItem value="4">April</SelectItem>
												<SelectItem value="5">May</SelectItem>
												<SelectItem value="6">June</SelectItem>
												<SelectItem value="7">July</SelectItem>
												<SelectItem value="8">August</SelectItem>
												<SelectItem value="9">September</SelectItem>
												<SelectItem value="10">October</SelectItem>
												<SelectItem value="11">November</SelectItem>
												<SelectItem value="12">December</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="year">Year</Label>
										<Select>
											<SelectTrigger id="year">
												<SelectValue placeholder="Year" />
											</SelectTrigger>
											<SelectContent>
												{Array.from({length: 10}, (_, i) => (
													<SelectItem
														key={i}
														value={`${new Date().getFullYear() + i}`}
													>
														{new Date().getFullYear() + i}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="cvc">CVC</Label>
										<Input id="cvc" placeholder="CVC" />
									</div>
								</div>
							</>
						)}
						{paymentMethod === 'paypal' && (
							<>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										required
										id="email"
										placeholder="Enter your email"
										type="email"
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="password">Password</Label>
									<Input
										required
										id="password"
										placeholder="Enter your password"
										type="password"
									/>
								</div>
							</>
						)}
						<Button type="submit" className="w-full mt-3">
							Pay ${amount} USD
						</Button>
					</form>
				</CardContent>
			</DialogContent>
		</Dialog>
	);
};
