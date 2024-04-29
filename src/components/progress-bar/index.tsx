import './style.scss';
import {FC} from 'react';

interface ProgressBarProps {
	progress: number;
}
export const ProgressBar: FC<ProgressBarProps> = (props) => {
	const {progress} = props;
	const style = {
		'--p': progress,
	};

	return (
		<div
			className="range
		shadow-sm rounded-sm border border-input overflow-hidden text-zinc-800"
			//@ts-ignore
			style={style}
		></div>
	);
};
