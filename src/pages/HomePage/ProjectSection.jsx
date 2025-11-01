import { fetchProjects } from "./../../data/projects";
import Section from "../../components/Section/Section";
import SectionHeader from "../../components/Section/SectionHeader";
import ProjectsList from "../../components/project/ProjectsList";
import { Link } from "react-router-dom";

const ProjectSection = ({ bgClass = "bg-white/50" }) => {
    return (
        <Section bgClass={bgClass}>
            <SectionHeader
                title="My Projects"
                text="Here are a few examples of my work, showcasing my skills in
                    building robust and scalable applications."
            />
            <ProjectsList fetchData={fetchProjects} maxItems={6} />
            <div className="mt-16 text-center">
                <Link
                    to="/projects"
                    className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                    View All Projects
                </Link>
            </div>
        </Section>
    );
};

export default ProjectSection;
