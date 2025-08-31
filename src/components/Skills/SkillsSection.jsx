import { useState } from "react";
import { SKILLS } from "../../config";
import SkillTag from "./SkillTag";
import { TabList } from "./../Common/TabList";
import { TabPanel } from "./../Common/TabPanel";
import { AccordionItem } from "./../Common/AccordionItem";
import Section from "../Section";
import SectionHeader from "../Section/Header";

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
            <div className="hidden md:block mt-8">
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
