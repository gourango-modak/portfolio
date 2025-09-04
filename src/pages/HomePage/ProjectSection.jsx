import { Link } from "react-router-dom";
import DataLoader from "../../components/Common/DataLoader";
import ProjectCard from "./../../components/Project/ProjectCard";
import { fetchProjects } from "./../../data/projects";
import Section from "../../components/Section";
import SectionHeader from "../../components/Section/Header";

const ProjectSection = () => {
    return (
        <Section bgClass="bg-white/50">
            <SectionHeader
                title="My Projects"
                text="Here are a few examples of my work, showcasing my skills in
                    building robust and scalable applications."
            />
            <DataLoader
                fetchData={fetchProjects}
                render={(projects) => (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                to="/projects"
                                className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
                            >
                                View All Projects
                            </Link>
                        </div>
                    </>
                )}
            />
        </Section>
    );
};

export default ProjectSection;
