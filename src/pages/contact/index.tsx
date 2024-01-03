import {FC} from 'react';
import {Button, Input, Textarea} from '@nextui-org/react';

export const ContactPage: FC = () => {
	return (
		<>
			<section id="contact">
				<div className="container px-6 py-20 mx-auto">
					<div className="flex flex-col text-center w-full mb-12">
						<h2 className="text-4xl font-bold text-center text-amber-400 mb-8">
							Contact Us
						</h2>
						<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
							We are always here to help you. Please feel free to contact us.
						</p>
					</div>
					<div className="lg:w-1/2 md:w-2/3 mx-auto">
						<div className="flex flex-wrap gap-4 flex-col">
							<Input
								type="text"
								id="name"
								name="name"
								label="Name"
								radius="full"
								color="warning"
								labelPlacement="inside"
							/>
							<Input
								type="email"
								id="email"
								name="email"
								label="Email"
								radius="full"
								color="warning"
								labelPlacement="inside"
							/>
							<Textarea
								id="message"
								name="message"
								label="Message"
								radius="full"
								color="warning"
								labelPlacement="inside"
							/>
							<div className="p-2 w-full">
								<Button
									size="lg"
									type="submit"
									radius="full"
									className="bg-amber-400 w-full hover:bg-amber-500 text-white font-bold py-2 px-4"
								>
									Send
								</Button>
							</div>
							<div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
								<a className="text-amber-500"></a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
