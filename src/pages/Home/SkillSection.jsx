import { Server, Database, Paintbrush, Wrench } from "lucide-react";
import SkillsShowcase from "../../components/skill/SkillsShowcase";

const Skill = () => {
    const skillsData = [
        {
            category: "Backend",
            icon: <Server size={24} />,
            skills: [
                ".NET Core",
                "ASP.NET MVC",
                "C#",
                "Entity Framework",
                "RESTful APIs",
                "SignalR",
            ],
        },
        {
            category: "Frontend",
            icon: <Paintbrush size={24} />,
            skills: [
                "React",
                "JavaScript",
                "HTML5",
                "CSS3 & Tailwind",
                "Angular",
            ],
        },
        {
            category: "Databases",
            icon: <Database size={24} />,
            skills: ["SQL Server", "MySQL", "PostgreSQL", "Entity Framework"],
        },
        {
            category: "Tools & Platforms",
            icon: <Wrench size={24} />,
            skills: ["Azure", "Docker", "Git & GitHub", "Jira", "CI/CD"],
        },
    ];
    return (
        <section id="skills" className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-2 text-slate-900">
                    Technical Skills
                </h2>
                <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                    A summary of my technical expertise, from backend logic to
                    frontend design and deployment.
                </p>
                <SkillsShowcase />
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillsData.map((skillCategory) => (
                        <div
                            key={skillCategory.category}
                            className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-indigo-600">
                                    {skillCategory.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    {skillCategory.category}
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skillCategory.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </section>
    );
};

export default Skill;
