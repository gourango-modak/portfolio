import { Link } from "react-router-dom";
import profile from "../assets/gm_original.png";

const AboutPage = () => (
    <section className="pt-30 pb-20 min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-2 text-slate-700 space-y-6">
                    <h1 className="text-4xl font-bold text-slate-900">
                        About Me
                    </h1>
                    <p className="text-lg">
                        Hello! I'm Gourango Modak, a Senior Software Engineer
                        based in Bangladesh with a passion for building
                        high-quality, scalable software. With four years of
                        professional experience, my journey in technology has
                        been driven by a deep-seated curiosity and a love for
                        solving complex problems.
                    </p>
                    <p>
                        My expertise lies in the .NET ecosystem, where I've had
                        the privilege of contributing to significant projects at{" "}
                        <strong className="font-semibold text-red-600">
                            Enosis Solutions
                        </strong>
                        . I thrive on architecting and developing robust backend
                        systems, but I'm equally comfortable working across the
                        full stack to bring ideas to life. For me, software
                        engineering is not just about writing code; it's about
                        crafting elegant solutions that are efficient,
                        maintainable, and provide real-world value.
                    </p>
                    <p>
                        Beyond the code, I'm an avid learner who enjoys keeping
                        up with the latest industry trends and exploring new
                        technologies. I believe in continuous improvement, both
                        personally and professionally. When I'm not at my
                        computer, you can find me exploring local cafes or
                        diving into a good book.
                    </p>
                    <p>
                        I'm always open to connecting with fellow professionals
                        and discussing new opportunities. Feel free to{" "}
                        <Link
                            to="/contact"
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            get in touch
                        </Link>
                        !
                    </p>
                </div>
                <div className="flex justify-center">
                    <img
                        src={profile}
                        alt="Gourango Modak"
                        className="rounded-xl shadow-2xl w-full max-w-xs lg:max-w-full"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://placehold.co/400x500/cccccc/ffffff?text=Image+Not+Found";
                        }}
                    />
                </div>
            </div>
        </div>
    </section>
);
export default AboutPage;
