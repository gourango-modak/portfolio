import { Github, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
    return (
        <footer id="contact" className="bg-white border-t border-gray-200 py-6">
            <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <p className="text-base text-gray-600">
                        &copy; 2024 Gourango Modak. All rights reserved.
                    </p>

                    <div className="flex space-x-4">
                        {/* Social Icon Button */}
                        <a
                            href="#"
                            className="group p-3 rounded-full bg-gray-100 hover:bg-indigo-600 transition-all duration-200 flex items-center justify-center transform hover:scale-110"
                        >
                            <Github
                                size={28}
                                className="text-gray-900 group-hover:text-white transition-colors duration-200"
                            />
                        </a>

                        <a
                            href="#"
                            className="group p-3 rounded-full bg-gray-100 hover:bg-indigo-600 transition-all duration-200 flex items-center justify-center transform hover:scale-110"
                        >
                            <Linkedin
                                size={28}
                                className="text-gray-900 group-hover:text-white transition-colors duration-200"
                            />
                        </a>

                        <a
                            href="#"
                            className="group p-3 rounded-full bg-gray-100 hover:bg-indigo-600 transition-all duration-200 flex items-center justify-center transform hover:scale-110"
                        >
                            <Facebook
                                size={28}
                                className="text-gray-900 group-hover:text-white transition-colors duration-200"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
