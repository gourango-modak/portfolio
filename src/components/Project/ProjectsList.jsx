import InfiniteScroll from "../Common/InfiniteScroll";
import ProjectCard from "./ProjectCard";

const ProjectsList = ({
    fetchData,
    onEdit,
    searchTerm = "",
    selectedCategories = [],
    maxItems = Infinity,
}) => (
    <InfiniteScroll
        key={`${searchTerm}-${selectedCategories.join("-")}`} // force remount on filter change
        fetchData={fetchData}
        renderItem={(project) => (
            <ProjectCard key={project.id} project={project} onEdit={onEdit} />
        )}
        limit={10}
        maxItems={maxItems}
        containerClass="grid gap-6 md:grid-cols-2"
    />
);

export default ProjectsList;
