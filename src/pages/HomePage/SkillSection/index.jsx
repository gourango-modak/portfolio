import SkillsShowcase from "./SkillsShowcase";

const SkillSection = () => {
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
            </div>
        </section>
    );
};

export default SkillSection;
