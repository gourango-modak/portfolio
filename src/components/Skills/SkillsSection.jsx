import { useState } from "react";
import SkillTag from "./SkillTag";
import { SKILLS } from "../../config";
import Section from "../section/Section";
import SectionHeader from "../section/SectionHeader";

const SkillsSection = ({ bgClass = "bg-gray-50" }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeCategory = SKILLS[activeIndex];

    return (
        <Section bgClass={bgClass}>
            <SectionHeader title="Technical Skills" />

            <div className="flex flex-col md:flex-row gap-8 mt-8">
                {/* Left Tabs */}
                <div className="flex md:flex-col md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 overflow-hidden overflow-x-auto">
                    {SKILLS.map((cat, index) => (
                        <button
                            key={cat.category}
                            onClick={() => setActiveIndex(index)}
                            className={`px-4 py-3 text-left text-sm transition-colors w-full cursor-pointer ${
                                activeIndex === index
                                    ? "text-indigo-600 border-b-2 md:border-b-0 md:border-l-4 border-indigo-600 bg-indigo-50"
                                    : "text-gray-600 hover:text-indigo-500"
                            }`}
                        >
                            <div className="font-semibold">{cat.category}</div>
                            <div className="text-gray-500 text-xs">
                                {cat.skills.length} skills
                            </div>
                        </button>
                    ))}
                </div>

                {/* Right Content */}
                <div className="flex-1">
                    <div className="flex flex-wrap gap-3 mt-2">
                        {activeCategory.skills.map((skill) => (
                            <SkillTag key={skill} skill={skill} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default SkillsSection;
