import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const Contact = () => {
    return (
        <section className="pt-24 pb-20 min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-900">
                        Get In Touch
                    </h1>
                    <p className="text-slate-600 mt-4 mb-12 max-w-2xl mx-auto">
                        I'm always excited to discuss new projects, creative
                        ideas, or opportunities. Whether you have a question or
                        just want to say hi, I'll try my best to get back to
                        you!
                    </p>
                </div>
                <div className="bg-white/60 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-gray-200 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left Column: Contact Info */}
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold text-slate-800">
                                Contact Information
                            </h2>
                            <div className="flex items-start gap-4">
                                <Mail
                                    size={24}
                                    className="text-indigo-600 mt-1"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Email
                                    </h3>
                                    <p className="text-slate-600">
                                        The best way to reach me.
                                    </p>
                                    <a
                                        href="mailto:gourango.modak@example.com"
                                        className="text-indigo-600 hover:underline"
                                    >
                                        gourango.modak@example.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin
                                    size={24}
                                    className="text-indigo-600 mt-1"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Location
                                    </h3>
                                    <p className="text-slate-600">
                                        Dhaka, Bangladesh
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Right Column: Social Links */}
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold text-slate-800">
                                Find Me Online
                            </h2>
                            <div className="flex items-start gap-4">
                                <Github
                                    size={24}
                                    className="text-indigo-600 mt-1"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        GitHub
                                    </h3>
                                    <p className="text-slate-600">
                                        Explore my projects and code.
                                    </p>
                                    <a
                                        href="#"
                                        className="text-indigo-600 hover:underline"
                                    >
                                        github.com/yourusername
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Linkedin
                                    size={24}
                                    className="text-indigo-600 mt-1"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        LinkedIn
                                    </h3>
                                    <p className="text-slate-600">
                                        Let's connect professionally.
                                    </p>
                                    <a
                                        href="#"
                                        className="text-indigo-600 hover:underline"
                                    >
                                        linkedin.com/in/yourusername
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
