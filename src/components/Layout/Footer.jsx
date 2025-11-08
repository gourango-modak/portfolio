import { Github, Linkedin } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-10 md:py-6">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Left Section */}
                    <div className="text-center md:text-left">
                        <NavLink
                            to="/"
                            className="text-2xl font-bold text-indigo-600"
                        >
                            Gourango.
                        </NavLink>
                        <p className="text-sm text-gray-500 mt-1">
                            Building elegant digital experiences.
                        </p>
                    </div>

                    {/* Middle Section - Navigation Links */}
                    <nav className="flex flex-wrap justify-center md:justify-center gap-6 text-sm font-medium text-gray-600">
                        <Link
                            to="/projects"
                            className="hover:text-indigo-600 transition-colors duration-200"
                        >
                            Projects
                        </Link>
                        <Link
                            to="/blog"
                            className="hover:text-indigo-600 transition-colors duration-200"
                        >
                            Blog
                        </Link>
                        <Link
                            to="/about"
                            className="hover:text-indigo-600 transition-colors duration-200"
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="hover:text-indigo-600 transition-colors duration-200"
                        >
                            Contact
                        </Link>
                        <Link
                            to="/applications"
                            className="hover:text-indigo-600 transition-colors duration-200"
                        >
                            Applications
                        </Link>
                    </nav>

                    {/* Right Section - Social Icons */}
                    <div className="flex space-x-4">
                        {[
                            {
                                icon: Github,
                                href: "https://github.com/gourango-modak",
                            },
                            {
                                icon: Linkedin,
                                href: "https://www.linkedin.com/in/gourango-modak/",
                            },
                        ].map(({ icon: Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-2.5 rounded-full bg-gray-100 hover:bg-indigo-600 transition-all duration-200 flex items-center justify-center transform hover:scale-110"
                            >
                                <Icon
                                    size={22}
                                    className="text-gray-900 group-hover:text-white transition-colors duration-200"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
