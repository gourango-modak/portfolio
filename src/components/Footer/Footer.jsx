import { Github, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
	return (
		<footer id="contact" className="bg-white border-t border-gray-200 py-6">
			<div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
				<div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
					<p className="text-sm text-slate-500">
						&copy; 2024 Gourango Modak. All rights reserved.
					</p>
					<div className="flex space-x-6">
						<a
							href="#"
							className="text-slate-500 hover:text-indigo-600 transition-colors"
						>
							<Github size={24} />
						</a>
						<a
							href="#"
							className="text-slate-500 hover:text-indigo-600 transition-colors"
						>
							<Linkedin size={24} />
						</a>
						<a
							href="#"
							className="text-slate-500 hover:text-indigo-600 transition-colors"
						>
							<Facebook size={24} />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
