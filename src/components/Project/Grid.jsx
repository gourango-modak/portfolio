import { useState } from "react";
import ProjectCard from "./Card";
import ProjectModal from "./Modal";

const ProjectGrid = ({ projects }) => {
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleEdit = (post) => {
        setSelectedProject(post);
        setIsProjectModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsProjectModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </>
    );
};

export default ProjectGrid;
