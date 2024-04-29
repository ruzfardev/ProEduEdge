import React, {FC} from 'react';
import {EChartsOption} from 'echarts';
import {EChart} from '@/lib/chart/Echart';
// @ts-ignore
import {ECBasicOption} from 'echarts/types/dist/shared';

interface IChartMakerProps {
	options: ECBasicOption | EChartsOption;
}
export const ChartMaker: FC<IChartMakerProps> = ({options}) => {
	return <EChart options={options} />;
};
