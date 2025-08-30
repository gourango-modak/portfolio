import { skillCategories } from "../../config/skillCategories";
import SkillCategory from "./SkillCategory";

// This is the main container for the entire skills section.
const SkillsShowcase = () => {
    return (
        <>
            {skillCategories.map((category) => (
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
