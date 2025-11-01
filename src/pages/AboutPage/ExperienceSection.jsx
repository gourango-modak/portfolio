import { useState } from "react";
import Section from "../../components/section/Section";
import SectionHeader from "../../components/section/SectionHeader";

const EXPERIENCE_DATA = [
    {
        company: "Enosis Solutions",
        title: "Senior Software Engineer",
        period: "2021 - Present",
        responsibilities: [
            <>
                Designed and developed{" "}
                <span className="font-semibold text-slate-700">
                    robust web applications
                </span>{" "}
                using{" "}
                <span className="font-semibold text-slate-700">
                    ASP.NET Core and modern front-end frameworks
                </span>{" "}
                , delivering high-quality, maintainable code.
            </>,
            <>
                Built and maintained{" "}
                <span className="font-semibold text-slate-700">
                    desktop applications
                </span>{" "}
                leveraging{" "}
                <span className="font-semibold text-slate-700">
                    WinForms, C++, and MFC
                </span>{" "}
                , enhancing legacy system performance and usability.
            </>,
            <>
                Architected and optimized{" "}
                <span className="font-semibold text-slate-700">
                    scalable database solutions
                </span>{" "}
                with{" "}
                <span className="font-semibold text-slate-700">
                    MS SQL Server
                </span>{" "}
                and{" "}
                <span className="font-semibold text-slate-700">
                    Entity Framework Core
                </span>
                , improving query efficiency and data integrity.
            </>,
            <>
                Collaborated with cross-functional teams to{" "}
                <span className="font-semibold text-slate-700">
                    define, design, and implement new features
                </span>
                , ensuring alignment with business requirements.
            </>,
            <>
                <span className="font-semibold text-slate-700">
                    Led code reviews
                </span>
                and mentored junior engineers, establishing best practices and
                raising overall code quality across projects.
            </>,
            <>
                Implemented{" "}
                <span className="font-semibold text-slate-700">
                    performance improvements and bug fixes
                </span>
                , contributing to a more stable and responsive software
                environment.
            </>,
        ],
    },
    {
        company: "Brain Station 23",
        title: "Software Engineer (Trainee)",
        period: "2021 - 2021",
        responsibilities: [
            <>
                Developed{" "}
                <span className="font-semibold text-slate-700">
                    standalone Java applications
                </span>{" "}
                using{" "}
                <span className="font-semibold text-slate-700">
                    Spring Boot
                </span>
                , following best practices for modular and scalable design.
            </>,
            <>
                Designed and implemented{" "}
                <span className="font-semibold text-slate-700">
                    RESTful APIs
                </span>
                , enabling efficient data flow between back-end services and
                front-end clients.
            </>,
            <>
                Gained hands-on experience with{" "}
                <span className="font-semibold text-slate-700">
                    microservices architecture
                </span>
                , supporting modular, maintainable, and scalable application
                development.
            </>,
            <>
                Participated in team{" "}
                <span className="font-semibold text-slate-700">
                    code reviews and collaborative planning
                </span>
                , gaining foundational experience in agile development
                processes.
            </>,
        ],
    },
];

const ExperienceSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeJob = EXPERIENCE_DATA[activeIndex];

    return (
        <Section bgClass="bg-white/50">
            <SectionHeader title="Professional Experience" />

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Tabs */}
                <div className="flex md:flex-col md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 overflow-hidden overflow-x-auto md:mb-50">
                    {EXPERIENCE_DATA.map((job, index) => (
                        <button
                            key={job.company}
                            onClick={() => setActiveIndex(index)}
                            className={`px-4 py-3 text-left text-sm transition-colors w-full cursor-pointer ${
                                activeIndex === index
                                    ? "text-indigo-600 border-b-2 md:border-b-0 md:border-l-4 border-indigo-600 bg-indigo-50"
                                    : "text-gray-600 hover:text-indigo-500"
                            }`}
                        >
                            <div className="font-semibold">{job.company}</div>
                            <div className="text-gray-500 text-xs">
                                {job.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                                {job.period}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Right Content */}
                <div className="flex-1">
                    <ul className="list-disc ml-5 space-y-2">
                        {activeJob.responsibilities.map((item, i) => (
                            <li key={i} className="text-slate-600">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Section>
    );
};

export default ExperienceSection;
