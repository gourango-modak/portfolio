import { useState } from "react";
import SkillTag from "./SkillTag";
import { TabList } from "./../common/TabList";
import { TabPanel } from "./../common/TabPanel";
import { AccordionItem } from "./../common/AccordionItem";
import Section from "../section/Section";
import SectionHeader from "../section/SectionHeader";
import { SKILLS } from "../../config";

const SkillsSection = ({ bgClass = "bg-gray-50" }) => {
    const [activeTab, setActiveTab] = useState(SKILLS[0].category);
    const [openAccordion, setOpenAccordion] = useState(SKILLS[0].category);

    const toggleAccordion = (category) => {
        setOpenAccordion(openAccordion === category ? null : category);
    };

    // Transform SKILLS for generic TabList/TabPanel
    const tabItems = SKILLS.map(({ category, skills }) => ({
        id: category,
        label: category,
        data: skills,
    }));

    return (
        <Section bgClass={bgClass}>
            <SectionHeader title="Technical Skills" />
            <div className="hidden md:block mt-8 mb-30">
                <TabList
                    items={tabItems}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabPanel
                    items={tabItems}
                    activeTab={activeTab}
                    renderContent={(skills) => (
                        <div className="flex flex-wrap justify-center gap-3">
                            {skills.map((skill) => (
                                <SkillTag key={skill} skill={skill} />
                            ))}
                        </div>
                    )}
                />
            </div>
            <div className="block md:hidden mt-8 space-y-2">
                {SKILLS.map(({ category, skills }) => (
                    <AccordionItem
                        key={category}
                        title={category}
                        isOpen={openAccordion === category}
                        onToggle={() => toggleAccordion(category)}
                    >
                        <div className="flex flex-wrap justify-start gap-3">
                            {skills.map((skill) => (
                                <SkillTag key={skill} skill={skill} />
                            ))}
                        </div>
                    </AccordionItem>
                ))}
            </div>
        </Section>
    );
};

export default SkillsSection;
