import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from 'swiper/modules';
import quotes from '../../quotes.json';
import {useRef} from 'react';
export const RSwiper = () => {
	const progressCircle = useRef(null);
	const progressContent = useRef(null);
	const onAutoplayTimeLeft = (s, time, progress) => {
		progressCircle.current.style.setProperty('--progress', 1 - progress);
		progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
	};
	return (
		<Swiper
			spaceBetween={30}
			centeredSlides={true}
			effect={'creative'}
			autoplay={{
				delay: 5000,
				disableOnInteraction: false,
			}}
			pagination={{
				clickable: true,
			}}
			modules={[Autoplay, Pagination]}
			onAutoplayTimeLeft={onAutoplayTimeLeft}
			className="mySwiper"
		>
			{quotes.map(({quote, author}, index) => (
				<SwiperSlide key={index}>
					<div className="w-6/12 mx-auto flex flex-col justify-center items-center h-full">
						<p className="text-2xl text-gray-700">{quote}</p>
						<em className="w-full text-gray-500 text-xs">{author}</em>
					</div>
				</SwiperSlide>
			))}
			<div className="autoplay-progress" slot="container-end">
				<svg viewBox="0 0 48 48" ref={progressCircle}>
					<circle cx="24" cy="24" r="20"></circle>
				</svg>
				<span ref={progressContent}></span>
			</div>
		</Swiper>
	);
};
