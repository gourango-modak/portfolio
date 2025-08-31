import SkillsSection from "../../components/Skills/SkillsSection";
import BlogSection from "./BlogSection";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";
import Contact from "./../../components/Contact/index";

const HomePage = () => {
    return (
        <div className="bg-gray-50">
            <HeroSection />
            <ProjectSection />
            <SkillsSection bgClass="bg-gray-50" />
            <BlogSection />
            <Contact bgClass="bg-gray-50" />
        </div>
    );
};

export default HomePage;
