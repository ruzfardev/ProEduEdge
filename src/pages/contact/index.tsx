import {FC} from 'react';
import {Button, Input, Textarea, Label} from '../../components/ui';

export const ContactPage: FC = () => {
	return (
		<>
			<section id="contact">
				<div className="container px-6 py-20 mx-auto">
					<div className="flex flex-col text-center w-full mb-12">
						<h2 className="text-4xl font-bold text-center text-orange-400 mb-8">
							Contact Us
						</h2>
						<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
							We are always here to help you. Please feel free to contact us.
						</p>
					</div>
					<div className="lg:w-1/2 md:w-2/3 mx-auto">
						<div className="flex flex-wrap gap-4 flex-col">
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="email">Email</Label>
								<Input type="text" id="name" placeholder="Name" />
							</div>
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="email">Email</Label>
								<Input type="email" id="email" placeholder="Email" />
							</div>
							<div className="grid w-full items-center gap-1.5">
								<Label htmlFor="email">Message</Label>
								<Textarea id="message" name="message" color="warning" />
							</div>
							<div className="p-2 w-full">
								<Button
									size="lg"
									type="submit"
									className="rounded-full w-full relative overflow-visible hover:-translate-y-1 px-12 shadow-orange-400 shadow-md bg-orange-400 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-orange-400 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
									// className="bg-orange-400 w-full hover:bg-orange-500 text-white font-bold py-2 px-4"
								>
									Send
								</Button>
							</div>
							<div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
								<a className="text-orange-500"></a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
