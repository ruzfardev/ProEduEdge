import React, {FC, useEffect, useRef, useState} from 'react';

import * as echarts from 'echarts';
import {EChartsOption} from 'echarts';

export interface EChartProps {
	options: EChartsOption;
}

export const EChart: FC<EChartProps> = ({options}) => {
	const chartRef = useRef<HTMLDivElement>(null);
	const chartInstanceRef = useRef<echarts.ECharts | null>(null);
	const [chartSize, setChartSize] = useState({width: 0, height: 0});

	useEffect(() => {
		const initializeChart = () => {
			const chartElement = chartRef.current;
			if (!chartElement) return;

			if (chartInstanceRef.current) {
				echarts.dispose(chartInstanceRef.current);
				chartInstanceRef.current = null;
			}

			chartInstanceRef.current = echarts.init(chartElement, 'light');
			const chartInstance = chartInstanceRef.current;
			chartInstance.setOption(options);
		};
		initializeChart();

		return () => {
			if (chartInstanceRef.current) {
				echarts.dispose(chartInstanceRef.current);
				chartInstanceRef.current = null;
			}
		};
	}, []);
	useEffect(() => {
		const handleResize = () => {
			const chartElement = chartRef.current;
			if (chartElement) {
				const rect = chartElement.getBoundingClientRect();
				setChartSize({width: rect.width, height: rect.height});
			}
		};
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<div
			id={'chart'}
			className="chart"
			style={{width: '100%', height: '100%'}}
			ref={chartRef}
		/>
	);
};
