import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
    const contactInfo = [
        {
            icon: <Mail size={24} />,
            title: "Email",
            subtitle: "The best way to reach me",
            link: "mailto:gourango.modak.2@gmail.com",
            display: "gourango.modak.2@gmail.com",
        },
        {
            icon: <MapPin size={24} />,
            title: "Location",
            subtitle: "Where I am based",
            display: "Dhaka, Bangladesh",
        },
    ];

    const socialLinks = [
        {
            icon: <Github size={24} />,
            title: "GitHub",
            subtitle: "Explore my projects and code",
            link: "https://github.com/gourango-modak",
            display: "github.com/gourango-modak",
        },
        {
            icon: <Linkedin size={24} />,
            title: "LinkedIn",
            subtitle: "Let's connect professionally",
            link: "https://www.linkedin.com/in/gourango-modak/",
            display: "linkedin.com/in/gourango-modak",
        },
    ];

    const InfoCard = ({ icon, title, subtitle, link, display }) => (
        <a
            href={link ? link : null}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-6 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer w-full"
        >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                {icon}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-slate-900">
                    {title}
                </h3>
                <p className="text-slate-500 text-sm">{subtitle}</p>
                {link ? (
                    <p className="text-indigo-600 hover:underline mt-1 text-sm break-words">
                        {display}
                    </p>
                ) : (
                    <span className="text-slate-700 mt-1 text-sm break-words">
                        {display}
                    </span>
                )}
            </div>
        </a>
    );

    return (
        <section className="pt-30 pb-25 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12 md:max-w-7xl">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                    <h1 className="text-4xl font-bold text-slate-900">
                        Get In Touch
                    </h1>
                </div>
                <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                    I'm always excited to discuss new projects, creative ideas,
                    or opportunities. Whether you have a question, feedback, or
                    just want to say hi, feel free to reach out!
                </p>

                {/* Contact and Social Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 pt-8">
                    {/* Left Column: Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-slate-800 pb-2 text-center md:text-left">
                            Contact Information
                        </h2>
                        {contactInfo.map((info) => (
                            <InfoCard key={info.title} {...info} />
                        ))}
                    </div>

                    {/* Right Column: Social Links */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold text-slate-800 pb-2 text-center md:text-left">
                            Find Me Online
                        </h2>
                        {socialLinks.map((social) => (
                            <InfoCard key={social.title} {...social} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
