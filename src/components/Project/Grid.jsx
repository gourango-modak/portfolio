import ProjectCard from "./Card";

const ProjectGrid = ({ projects }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
        ))}
    </div>
);

export default ProjectGrid;
