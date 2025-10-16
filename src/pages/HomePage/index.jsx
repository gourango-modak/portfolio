import SkillsSection from "../../components/Skills/SkillsSection";
import BlogSection from "./BlogSection";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";

const HomePage = () => {
    return (
        <div className="bg-gray-50">
            <HeroSection />
            <ProjectSection />
            <SkillsSection bgClass="bg-gray-50" />
            <BlogSection />
        </div>
    );
};

export default HomePage;
