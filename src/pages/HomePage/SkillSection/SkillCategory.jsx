import SkillBadge from "./SkillBadge";

const SkillCategory = ({ title, skills }) => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold  mb-6 border-b-2 border-slate-700 pb-2">
                {title}
            </h3>
            <div className="flex flex-wrap gap-5">
                {skills.map((skill) => (
                    <SkillBadge
                        key={skill.name}
                        name={skill.name}
                        proficiency={skill.proficiency}
                        experience={skill.experience}
                        iconClass={skill.iconClass}
                    />
                ))}
            </div>
        </div>
    );
};

export default SkillCategory;
