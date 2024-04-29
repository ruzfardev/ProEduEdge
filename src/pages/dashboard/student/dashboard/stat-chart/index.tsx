import {Button, Card} from '@/components/ui';
import {ChartMaker} from '@/lib/chart';
import React, {FC} from 'react';
import {StudentCourseStat} from '@/redux/features/student/types';
import {useNavigate} from 'react-router';

const option = {
	title: {
		text: 'Courses From Categories',
	},
	tooltip: {
		trigger: 'item',
	},
	legend: {
		bottom: 0,
	},
	series: [
		{
			name: 'Courses From Categories',
			type: 'pie',
			radius: ['40%', '80%'],
			avoidLabelOverlap: false,
			padAngle: 5,
			itemStyle: {
				borderRadius: 10,
			},
			label: {
				show: false,
				position: 'center',
			},
			emphasis: {
				label: {
					show: true,
					fontSize: 20,
					fontWeight: 'bold',
				},
			},
			labelLine: {
				show: false,
			},
		},
	],
};

interface StatChartProps {
	data: StudentCourseStat[] | null;
}

export const StatChart: FC<StatChartProps> = (props) => {
	const navigate = useNavigate();
	return (
		<div className="w-4/12 h-full">
			<Card className="bg-transparent flex flex-col p-2 px-3 space-y-4 h-full">
				{props.data && props.data.length === 0 && (
					<div className="w-full h-full flex flex-col text-orange-400 items-center justify-center mx-auto text-center">
						<h1 className="text-2xl mt-2 font-bold">No courses found</h1>
						<Button
							className="mt-6"
							size="lg"
							onClick={() => navigate('/courses')}
						>
							Explore Courses
						</Button>
					</div>
				)}
				{props.data && props.data?.length > 0 && (
					<ChartMaker
						options={{
							...option,
							series: [
								{
									...option.series[0],
									data: props.data,
								},
							],
						}}
					/>
				)}
			</Card>
		</div>
	);
};
