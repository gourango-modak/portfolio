import SkillBadge from "./SkillBadge";

// This component renders a single category section with its title and badges.
const SkillCategory = ({ title, skills }) => {
    return (
        <div className="mb-8">
            {/* Category Title */}
            <h3 className="text-xl font-semibold  mb-4 border-b-2 border-slate-700 pb-2">
                {title}
            </h3>
            {/* Container for the skill badges */}
            <div className="flex flex-wrap gap-3">
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
