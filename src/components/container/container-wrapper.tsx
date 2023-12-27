import React, {FC} from 'react';

interface ContainerWrapperProps {
	children?: React.ReactNode;
	title: string;
	subtitle: string;
}
export const ContainerWrapper: FC<ContainerWrapperProps> = ({
	children,
	title,
	subtitle,
}) => {
	return (
		<section className="bg-gradient-to-tr from-yellow-600 to-yellow-500 flex flex-col text-white px-6 py-20">
			<div className="w-8/12 mx-auto">
				<div className="flex flex-col items-start w-5/12 leading-5 justify-start">
					<h1 className="text-5xl line-clamp-5 font-bold mb-6">{title}</h1>
					<p className="text-xl mb-8">{subtitle}</p>
					{children}
				</div>
			</div>
		</section>
	);
};
