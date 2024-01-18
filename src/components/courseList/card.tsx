import {FC, useState} from 'react';
import {cn} from '@/lib/utils';
interface Props {
	id: number;
	title: string;
	banner: string;
	price: number;
	onCardClick: Function;
}
export const PCard: FC<Props> = (props) => {
	const {onCardClick, id, title, price, banner} = props;
	const [loadedImages, setLoadedImages] = useState<any>({});
	const handleImageLoad = (id: number) => {
		setLoadedImages((prev: any) => ({...prev, [id]: true}));
	};
	return (
		<div
			onClick={() => onCardClick(id)}
			className={cn(
				'space-y-3 cursor-pointer hover:scale-105   transition-all'
			)}
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
					src={`https://source.unsplash.com/random?sig=${id}`}
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
