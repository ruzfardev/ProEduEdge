import {FC, useState} from 'react';
import {cn, getBlobUrlWithSasToken} from '@/lib/utils';
import {Course} from '@/redux/features/course/types';
interface Props {
	course: Course;
	onCardClick: Function;
}
export const PCard: FC<Props> = (props) => {
	const {id, title, price, banner} = props.course;
	const {onCardClick} = props;
	const [loadedImages, setLoadedImages] = useState<any>({});
	const handleImageLoad = (id: string) => {
		setLoadedImages((prev: any) => ({...prev, [id]: true}));
	};
	return (
		<div
			onClick={() => onCardClick(props.course)}
			className={cn('cursor-pointer max-h-[200px]')}
			key={id}
		>
			<div className="overflow-hidden rounded-md">
				{!loadedImages[id] && (
					<div
						className={cn(
							'skeleton',
							'portrait' === 'portrait' ? 'aspect-[4/2]' : 'aspect-square'
						)}
					></div>
				)}
				<img
					src={getBlobUrlWithSasToken(banner, 'banners')}
					onLoad={() => handleImageLoad(id)}
					className={cn(
						'h-auto w-auto object-cover transition-all',
						'portrait' === 'portrait' ? 'aspect-[4/2]' : 'aspect-square',
						!loadedImages[id] && 'hidden'
					)}
				/>
			</div>
			<div className="space-y-1 text-sm p-2 aspect-[10/2]">
				<h3 className="font-medium leading-none">{title}</h3>
				<p className="text-xs text-muted-foreground">{price} $</p>
			</div>
		</div>
	);
};
