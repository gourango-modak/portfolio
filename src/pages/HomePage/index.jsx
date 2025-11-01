import BlogSection from "./BlogSection";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";

const HomePage = () => {
    return (
        <div className="bg-gray-50">
            <HeroSection />
            <BlogSection />
            <ProjectSection bgClass="bg-gray-50" />
        </div>
    );
};

export default HomePage;
