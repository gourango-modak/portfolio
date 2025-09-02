import { Link } from "react-router-dom";
import { Download, Mail } from "lucide-react";
import profile from "../../assets/gm_original.png"; // adjust path to your image

const AboutSection = () => {
    return (
        <section className="pt-30 pb-20 min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    {/* Image */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-start items-start">
                        <div className="relative w-full max-w-xs lg:max-w-full">
                            <div className="absolute inset-0 bg-indigo-200/50 rounded-full blur-2xl animate-pulse"></div>
                            <img
                                src={profile}
                                alt="Gourango Modak's professional portrait"
                                className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://placehold.co/400x400/cccccc/ffffff?text=Image+Not+Found";
                                }}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="order-2 lg:order-1 lg:col-span-2 text-slate-700 space-y-6">
                        <h1 className="text-4xl font-bold text-slate-900 mb-6">
                            About Me
                        </h1>
                        <p className="text-slate-600">
                            Hello! I'm Gourango, a Senior Software Engineer with{" "}
                            <span className="text-indigo-600 font-semibold">
                                4 years of experience
                            </span>{" "}
                            building high-performance, scalable applications. I
                            thrive on solving complex problems and delivering
                            end-to-end solutions across the full stack,
                            combining robust backend architecture with
                            intuitive, responsive frontend experiences. My
                            expertise spans designing maintainable code,
                            optimizing system performance, and implementing best
                            practices that ensure reliability and efficiency.
                        </p>
                        <p className="text-slate-600">
                            Driven by a passion for continuous learning, I
                            constantly explore emerging technologies and tools
                            to enhance my craft. I take pride in building
                            software that not only works seamlessly but also
                            delivers measurable business value and a great user
                            experience.
                        </p>
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-12">
                            <Link
                                to="/resume.pdf" // you can place your resume in public/ folder
                                download
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                            >
                                <Download size={20} />
                                Download Resume
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-800 px-6 py-3 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-800 hover:text-white"
                            >
                                <Mail size={20} />
                                <span>Get in Touch</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
