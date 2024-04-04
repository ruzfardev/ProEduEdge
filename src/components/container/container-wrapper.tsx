import React, {FC} from 'react';
import {cn} from '@/lib/utils';
interface ContainerWrapperProps {
	children?: React.ReactNode;
	title: string;
	subtitle: string;
	banner?: string;
	className?: string;
}
export const ContainerWrapper: FC<ContainerWrapperProps> = ({
	children,
	title,
	subtitle,
	banner,
	className,
}) => {
	return (
		<>
			{banner ? (
				<section
					style={{
						backgroundImage: `url(${banner})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundBlendMode: 'darken',
					}}
					className="relative  bg-gradient-to-tr from-orange-500 to-orange-400 flex flex-col text-white px-6 py-20"
				>
					<div className="z-40 w-9/12 mx-auto">
						<div className="flex flex-col items-start w-8/12 leading-5 justify-start">
							<h1 className="text-5xl font-bold mb-6">{title}</h1>
							<p className="text-medium font-light text-gray-300 mb-8">
								{subtitle}
							</p>
							{children}
						</div>
					</div>
					{banner && (
						<div className="z-0 absolute inset-0 bg-black opacity-40"></div>
					)}
				</section>
			) : (
				<section
					className={cn(
						'relative bg-gradient-to-tr from-orange-500 to-orange-400 flex flex-col text-white px-6 py-20',
						className ? className : ''
					)}
				>
					<div className="z-40 w-8/12 mx-auto">
						<div className="flex flex-col items-center w-full leading-5 justify-center">
							<h1 className="text-center text-5xl font-bold mb-6">{title}</h1>
							<p className="text-xl mb-8">{subtitle}</p>
							{children}
						</div>
					</div>
				</section>
			)}
		</>
	);
};
