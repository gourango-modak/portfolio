import { useMemo, useState } from "react";
import SearchBar from "../Common/SearchBar";
import TagFilter from "../Common/TagFilter";
import ProjectGrid from "./ProjectGrid";

const ProjectList = ({ projects }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState(null);

    // Calculate top 10 tags
    const topTags = useMemo(() => {
        const tagCounts = projects
            .flatMap((project) =>
                Array.isArray(project.tags) ? project.tags : []
            )
            .reduce((acc, tag) => {
                acc[tag] = (acc[tag] || 0) + 1;
                return acc;
            }, {});

        return Object.entries(tagCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([tag]) => tag);
    }, [projects]);

    // Filter projects based on search & selected tag
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const titleMatch = project.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const tagMatch = selectedTag
                ? project.tags.includes(selectedTag)
                : true;
            return titleMatch && tagMatch;
        });
    }, [searchTerm, selectedTag, projects]);

    return (
        <>
            <div className="mb-12">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <TagFilter
                    topTags={topTags}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                    allLabel="All Projects"
                />
            </div>
            <ProjectGrid projects={filteredProjects} />
        </>
    );
};

export default ProjectList;
