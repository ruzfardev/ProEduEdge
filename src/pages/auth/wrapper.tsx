import blob from '../../assets/images/blob.svg';
import blob1 from '../../assets/images/blob-1.svg';
import {RSwiper} from '../../components/carousel';
import {FC} from 'react';

interface WrapperAuthProps {
	children: React.ReactNode;
}
export const WrapperAuth: FC<WrapperAuthProps> = ({children}) => {
	return (
		<section className="w-full flex" style={{height: '100vh'}}>
			<div
				className="container w-6/12 h-full relative flex flex-col justify-center items-center overflow-hidden"
				style={{position: 'relative', background: '#FFF7DF'}}
			>
				<img src={blob} alt="blob" className="blob-1 w-4/12 h-4/12" />
				<img src={blob1} alt="blob" className="blob-2 w-4/12 h-4/12" />
				{children}
			</div>
			<div className="container w-6/12  h-full bg-gray-200">
				<RSwiper />
			</div>
		</section>
	);
};
