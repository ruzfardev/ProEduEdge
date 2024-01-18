import {FC} from 'react';
import {Button} from '../ui/button';
import {ContainerWrapper} from '../container/container-wrapper.tsx';

export const Hero: FC = () => {
	return (
		<ContainerWrapper
			className="mt-16"
			title="Get Access to Unlimited Educational Resources. Everywhere,
						Everytime."
			subtitle="premium access to more than 10,000 resources ranging from courses,
						events e.t.c."
		>
			<Button
				className="rounded-full bg-white px-12 py-6 text-orange-500
				hover:bg-white hover:text-orange-500 shadow-md
			"
			>
				Get Access
			</Button>
		</ContainerWrapper>
	);
};
