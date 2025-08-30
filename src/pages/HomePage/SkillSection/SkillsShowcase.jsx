import { SKILL_CATEGORIES } from "../../../config";
import SkillCategory from "./SkillCategory";

const SkillsShowcase = () => {
    return (
        <>
            {SKILL_CATEGORIES.map((category) => (
                <SkillCategory
                    key={category.title}
                    title={category.title}
                    skills={category.skills}
                />
            ))}
        </>
    );
};

export default SkillsShowcase;
