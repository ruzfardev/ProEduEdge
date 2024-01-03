import {FC} from 'react';
import about from '../../assets/images/about.svg';
import about1 from '../../assets/images/about-1.svg';
import {Button, Image} from '@nextui-org/react';
import svg4 from '../../assets/images/Registered Students.svg';
import svg from '../../assets/images/Helped Students.svg';
import svg5 from '../../assets/images/Rank.svg';
import svg6 from '../../assets/images/Visits.svg';
import {ContainerWrapper} from '../../components/container/container-wrapper.tsx';
export const AboutPage: FC = () => {
	return (
		<>
			<section>
				<div className="container w-9/12 mx-auto px-6 p-10">
					<h2 className="text-4xl font-bold text-center text-amber-400 mb-8">
						About Us
					</h2>
					<div className="flex items-center flex-wrap mb-20">
						<div className="w-full md:w-1/2">
							<h4 className="text-3xl text-gray-800 font-bold mb-3">Mission</h4>
							<p className="text-gray-600 mb-8">
								Our mission is to provide affordable and accessible education to
								everyone. We believe that every person has the right to learn
								and grow. We also believe that education should be fun and
								interactive.
							</p>
							<h4 className="text-3xl text-gray-800 font-bold mb-3">Vision</h4>
							<p className="text-gray-600 mb-8">
								Our vision is to be the largest online learning platform in the
								world. We aim to provide the best learning experience to our
								students. We also aim to provide the best teaching experience to
								our instructors.
							</p>
						</div>
						<div className="w-full md:w-1/2">
							<img className="w-5/6 mx-auto" src={about} alt="about" />
						</div>
					</div>
					<div className="flex items-center flex-wrap mb-20">
						<div className="w-full md:w-1/2">
							<img className="w-5/6 mx-auto" src={about1} alt="about" />
						</div>
						<div className="w-full md:w-1/2 pl-10">
							<h4 className="text-3xl text-gray-800 font-bold mb-3">
								Our Story
							</h4>
							<p className="text-gray-600 mb-8">
								We started in 2020 with a mission to provide affordable and
								accessible education to everyone. We believe that every person
								has the right to learn and grow. We also believe that education
								should be fun and interactive.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="px-12" style={{background: '#EFE4CF'}}>
				<div className="md:w-10/12 w-9/12 px-6 mx-auto py-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 ">
					<div className="flex flex-col justify-between items-center sm:px-10">
						<Image className="py-5" src={svg4} width={120} height={120} />
						<div>
							<h3 className="text-5xl text-gray-700 font-semibold">10000+</h3>
							<p className="text-gray-500 text-xs text-center">
								Registered Students
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-between items-center sm:px-10">
						<Image className="py-5" src={svg} width={120} height={120} />
						<div>
							<h3 className="text-5xl text-gray-700 text-center font-semibold">
								2168
							</h3>
							<p className="text-gray-500 text-xs text-center">
								Students Helped each other
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-between items-center sm:px-10">
						<Image className="py-5" src={svg5} width={120} height={120} />
						<div>
							<h3 className="text-5xl text-gray-700 font-semibold">120+</h3>
							<p className="text-gray-500 text-xs text-center">
								Registered Students
							</p>
						</div>
					</div>
					<div className="flex flex-col justify-between	 items-center sm:px-10">
						<Image className="py-5" src={svg6} width={120} height={120} />
						<div>
							<h3 className="text-5xl text-gray-700  font-semibold text-center">
								10000
							</h3>
							<p className="text-gray-500 text-xs text-center	">
								More than 10,000 visits
							</p>
						</div>
					</div>
				</div>
			</section>
			<ContainerWrapper
				title="Let’s Build Something Great Together"
				subtitle="ProEduEdge is an online education platform that delivers video courses, programs and resources for Individual"
			>
				<div className="flex justify-center mt-10 ">
					<Button
						radius="full"
						size="lg"
						className="text-amber-400 bg-white px-12"
						href="/contact"
					>
						Let’s Get Started
					</Button>
				</div>
			</ContainerWrapper>
		</>
	);
};
