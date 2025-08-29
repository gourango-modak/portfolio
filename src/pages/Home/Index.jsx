import BlogSection from "./BlogSection";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";
import SkillSection from "./SkillSection";

const Home = () => {
    return (
        <div className="bg-gray-50">
            <HeroSection />
            <ProjectSection />
            <SkillSection />
            <BlogSection />
        </div>
    );
};

export default Home;
