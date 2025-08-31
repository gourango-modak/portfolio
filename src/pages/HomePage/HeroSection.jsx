import { ArrowRight, Mail } from "lucide-react";
import profile from "../../assets/gm_original.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section
            id="hero-section"
            className="min-h-screen flex items-center bg-gray-50 pt-24 md:pt-0 md:max-w-6xl mx-auto"
        >
            <div className="px-6 md:px-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="text-center md:text-left order-last md:order-first">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
                            Gourango{" "}
                            <span className="whitespace-nowrap">
                                Modak{" "}
                                <span className="inline-block animate-wave">
                                    👋
                                </span>
                            </span>
                        </h1>
                        <p className="text-lg md:text-2xl text-indigo-600 font-semibold mb-6">
                            Senior Software Engineer | .NET Specialist
                        </p>
                        <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto md:mx-0">
                            As a Senior Software Engineer at
                            <a
                                href="https://www.enosisbd.com/"
                                className="font-semibold text-indigo-600"
                            >
                                {" "}
                                Enosis Solutions{" "}
                            </a>
                            with 4 years of dedicated experience in .NET, I
                            specialize in building scalable and robust
                            applications that solve complex business challenges.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                to={"/projects"}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                            >
                                View My Work
                                <ArrowRight size={20} />
                            </Link>
                            <Link
                                to={"/contact"}
                                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-800 px-6 py-3 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-800 hover:text-white"
                            >
                                <Mail size={20} />
                                <span>Get in Touch</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end order-first md:order-last">
                        <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
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
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
