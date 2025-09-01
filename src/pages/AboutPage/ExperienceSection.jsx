import Section from "../../components/Section";
import Job from "./Job";
import SectionHeader from "./../../components/Section/Header";

const ExperienceSection = () => (
    <Section bgClass="bg-white/50">
        <SectionHeader title="Professional Experience" />
        <div className="relative border-l-2 border-gray-200">
            <Job
                company="Enosis Solutions"
                title="Senior Software Engineer"
                period="2021 - Present"
            >
                <li className="text-slate-600">
                    Develop and maintain robust web applications using{" "}
                    <span className="text-slate-700 font-semibold">
                        ASP.NET Core, C#
                    </span>
                    , and modern front-end frameworks.
                </li>
                <li className="text-slate-600">
                    Design and manage scalable database solutions with{" "}
                    <span className="text-slate-700 font-semibold">
                        MS SQL Server
                    </span>{" "}
                    and{" "}
                    <span className="text-slate-700 font-semibold">
                        Entity Framework Core
                    </span>
                    .
                </li>
                <li className="text-slate-600">
                    Architect and implement{" "}
                    <span className="text-slate-700 font-semibold">
                        microservices
                    </span>{" "}
                    to enhance application modularity and scalability.
                </li>
                <li className="text-slate-600">
                    Collaborate with cross-functional teams to define, design,
                    and ship new features.
                </li>
                <li className="text-slate-600">
                    Lead code reviews and mentor junior engineers to uphold high
                    code quality standards.
                </li>
            </Job>

            <Job
                company="Tech Solutions Inc."
                title="Software Engineer"
                period="2019 - 2021"
            >
                <li className="text-slate-600">
                    Contributed to the development of a legacy desktop
                    application using{" "}
                    <span className="text-slate-700 font-semibold">
                        .NET Framework
                    </span>{" "}
                    and{" "}
                    <span className="text-slate-700 font-semibold">WPF</span>.
                </li>
                <li className="text-slate-600">
                    Wrote and optimized complex{" "}
                    <span className="text-slate-700 font-semibold">
                        SQL queries
                    </span>{" "}
                    and stored procedures for data retrieval and manipulation in{" "}
                    <span className="text-slate-700 font-semibold">
                        SQL Server
                    </span>
                    .
                </li>
                <li className="text-slate-600">
                    Worked closely with a team of developers to troubleshoot and
                    resolve bugs, improving application{" "}
                    <span className="text-slate-700 font-semibold">
                        stability by 15%
                    </span>
                    .
                </li>
                <li className="text-slate-600">
                    Participated in the full{" "}
                    <span className="text-slate-700 font-semibold">
                        software development lifecycle
                    </span>
                    , from requirements gathering to deployment and maintenance.
                </li>
            </Job>
        </div>
    </Section>
);

export default ExperienceSection;
