import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./../../components/Skills/SkillsSection";
import Contact from "./../../components/Contact/Contact";

const AboutPage = () => {
    return (
        <main className="bg-gray-50">
            <AboutSection />
            <ExperienceSection />
            <SkillsSection bgClass="bg-gray-50" />
            <Contact bgClass="bg-white/50" />
        </main>
    );
};

export default AboutPage;
