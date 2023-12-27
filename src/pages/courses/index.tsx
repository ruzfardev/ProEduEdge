import {ContainerWrapper} from '../../components/container/container-wrapper.tsx';
import {FC} from 'react';
import {Input} from '@nextui-org/react';
import {FaSearch} from 'react-icons/fa';
export const CoursesPage: FC = () => {
	return (
		<>
			<ContainerWrapper
				title="Browse Thousands of Our Video Tutorials"
				subtitle="Access all tutorials and resources when you become a premium member of our platform."
			/>
			<section className="w-8/12 mx-auto py-4">
				<Input
					classNames={{
						base: 'max-w-full',
						mainWrapper: 'h-full',
						input: 'text-small',
						inputWrapper:
							'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
					}}
					placeholder="Type to search..."
					size="sm"
					type="search"
					startContent={<FaSearch size={15} />}
				/>
			</section>
		</>
	);
};
