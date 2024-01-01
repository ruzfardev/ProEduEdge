import {FC} from 'react';
import {FaInstagram, FaTelegram, FaLinkedin, FaYoutube} from 'react-icons/fa';

export const Footer: FC = () => {
	return (
		<footer className="bg-gray-900 text-white">
			<div className="max-w-6xl mx-auto px-4 py-10 md:flex md:items-center md:justify-between">
				<div className=" w-4/12 mb-6 md:mb-0">
					<a href="/" className="flex flex-col text-2xl font-bold">
						ProEduEdge
						<span className="text-yellow-500 font-light italic	 text-sm">
							Unlocking Your Learning Potential
						</span>
					</a>
					<p className="mt-2 text-gray-400 text-sm">
						ProEduEdge is a platform for learning and teaching online where
						students are mastering new skills and achieving their goals by
						learning from an extensive library of over 45,000 courses taught by
						expert instructors.
					</p>
					<div className="flex mt-4 space-x-2">
						<a href="#" className="text-blue-600 hover:text-blue-800">
							<FaLinkedin size={25} />
						</a>
						<a href="#" className="text-blue-300 hover:text-blue-500">
							<FaTelegram size={25} />
						</a>
						<a href="#" className="text-red-600 hover:text-red-800">
							<FaYoutube size={25} />
						</a>
						<a href="#" className="text-pink-600 hover:text-pink-800">
							<FaInstagram size={25} />
						</a>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h6 className="text-gray-400 font-bold uppercase">Quicklinks</h6>
						<ul className="mt-4 space-y-2 font-light text-tiny">
							<li>
								<a href="#" className="hover:underline">
									Home
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Courses
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									About Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Contact Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Become A Contributor
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h6 className="text-gray-400 font-bold uppercase">Contact Us</h6>
						<ul className="mt-4 space-y-2 font-light text-tiny">
							<li>+99 080 070 4224</li>
							<li>
								<a href="00011888@wiut.uz" className="hover:underline">
									00011888@wiut.uz
								</a>
							</li>
							<li>Tashkent, Uzbekistan</li>
							<li>Mirzo Ulugbek district, 4th block, 32</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="text-gray-400 bg-black text-sm text-center py-4">
				<div className="flex justify-center items-center">
					<p>All Right Reserved | ProEduEdge &copy; 2023</p>
					<div className="ml-4 space-x-4">
						<a href="#" className="hover:underline">
							Terms and Conditions
						</a>
						<a href="#" className="hover:underline">
							Privacy Policy
						</a>
						<a href="#" className="hover:underline">
							Site Credit
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
