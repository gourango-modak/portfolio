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
                Develop and maintain robust web applications using{" "}
                <span className="font-semibold text-slate-700">
                    ASP.NET Core, C#
                </span>{" "}
                and modern front-end frameworks.
            </>,
            <>
                Develop and maintain robust desktop applications using{" "}
                <span className="font-semibold text-slate-700">
                    Winform, C++, MFC
                </span>
                .
            </>,
            <>
                Design and manage scalable databases with{" "}
                <span className="font-semibold text-slate-700">
                    MS SQL Server
                </span>{" "}
                and{" "}
                <span className="font-semibold text-slate-700">
                    Entity Framework Core
                </span>
                .
            </>,
            "Collaborate with cross-functional teams to define, design, and ship new features.",
            "Lead code reviews and mentor junior engineers to uphold code quality standards.",
        ],
    },
    {
        company: "Brain Station 23",
        title: "Software Engineer (Trainee)",
        period: "2021 - 2021",
        responsibilities: [
            <>
                Developed standalone applications using{" "}
                <span className="font-semibold text-slate-700">
                    Spring Boot
                </span>{" "}
                in Java.
            </>,
            <>
                Designed and implemented{" "}
                <span className="font-semibold text-slate-700">
                    RESTful APIs
                </span>{" "}
                to serve data efficiently.
            </>,
            "Worked with Microservices Architecture for modular and scalable applications.",
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
