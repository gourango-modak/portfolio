import Job from "./Job";
import Section from "./../../components/Section/Section";
import SectionHeader from "./../../components/Section/SectionHeader";

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
                    Develop and maintain robust desktop applications using{" "}
                    <span className="text-slate-700 font-semibold">
                        Winform, C#, C++, MFC
                    </span>
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
                    Collaborate with cross-functional teams to define, design,
                    and ship new features.
                </li>
                <li className="text-slate-600">
                    Lead code reviews and mentor junior engineers to uphold high
                    code quality standards.
                </li>
            </Job>

            <Job
                company="Brain Station 23"
                title="Software Engineer (Trainee)"
                period="2021 - 2021"
            >
                <li className="text-slate-600">
                    Developed standalone applications using{" "}
                    <span className="text-slate-700 font-semibold">
                        Spring Boot
                    </span>{" "}
                    in Java.
                </li>
                <li className="text-slate-600">
                    Designed and implemented{" "}
                    <span className="text-slate-700 font-semibold">
                        RESTful APIs
                    </span>{" "}
                    to serve data efficiently to front-end clients.
                </li>
                <li className="text-slate-600">
                    Worked with Microservices Architecture for modular and
                    scalable application design.
                </li>
            </Job>
        </div>
    </Section>
);

export default ExperienceSection;
