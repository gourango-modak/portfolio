import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./../../components/Skills/SkillsSection";

const AboutPage = () => {
    return (
        <main className="bg-gray-50">
            <AboutSection />
            <ExperienceSection />
            <SkillsSection bgClass="bg-gray-50" />
        </main>
    );
};

export default AboutPage;
