import {FC} from 'react';
import {Button} from '@nextui-org/react';
import {ContainerWrapper} from '../container/container-wrapper.tsx';

export const Hero: FC = () => {
	return (
		<ContainerWrapper
			title="Get Access to Unlimited Educational Resources. Everywhere,
						Everytime."
			subtitle="premium access to more than 10,000 resources ranging from courses,
						events e.t.c."
		>
			<Button radius="full" className="bg-white px-12 py-6 text-warning">
				Get Access
			</Button>
		</ContainerWrapper>
	);
};
