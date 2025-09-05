import { useMemo, useState } from "react";
import SearchBar from "../common/SearchBar";
import TagFilter from "../common/TagFilter";
import ProjectGrid from "./ProjectGrid";

const ProjectList = ({ projects }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Calculate top 10 categories
    const topCategories = useMemo(() => {
        // Count occurrences of each category
        const categoryCounts = projects.reduce((acc, project) => {
            if (project.category) {
                acc[project.category] = (acc[project.category] || 0) + 1;
            }
            return acc;
        }, {});

        // Sort by count descending and take top 10
        return Object.entries(categoryCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([category]) => category);
    }, [projects]);

    // Filter projects based on search & selected category
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const titleMatch = project.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const categoryMatch = selectedCategory
                ? project.category === selectedCategory
                : true;

            return titleMatch && categoryMatch;
        });
    }, [searchTerm, selectedCategory, projects]);

    return (
        <>
            <div className="mb-12">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <TagFilter
                    topTags={topCategories}
                    selectedTag={selectedCategory}
                    setSelectedTag={setSelectedCategory}
                    allLabel="All Projects"
                />
            </div>
            <ProjectGrid projects={filteredProjects} />
        </>
    );
};

export default ProjectList;
