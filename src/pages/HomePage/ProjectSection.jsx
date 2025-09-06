import { fetchProjects } from "./../../data/projects";
import Section from "../../components/Section/Section";
import SectionHeader from "../../components/Section/SectionHeader";
import ProjectsList from "../../components/project/ProjectsList";

const ProjectSection = () => {
    return (
        <Section bgClass="bg-white/50">
            <SectionHeader
                title="My Projects"
                text="Here are a few examples of my work, showcasing my skills in
                    building robust and scalable applications."
            />
            <ProjectsList fetchData={fetchProjects} maxItems={6} />
        </Section>
    );
};

export default ProjectSection;
