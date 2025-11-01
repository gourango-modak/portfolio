import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "./../../../components/common/InfiniteScroll";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../../components/common/SearchBar";
import { fetchProjects, fetchProjectTags } from "./../../../data/projects";
import ProjectCard from "./../../../components/project/ProjectCard";
import { MultiSelectDropdown } from "../../../components/common/MultiSelectDropdown";
import { fetchAllCategories } from "../../../data/categories";
import { CONTENT_STATUSES } from "../../../config";

export const ProjectsPanel = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await fetchAllCategories();
            setCategories(categories.map((c) => c.name));
        };

        const loadTags = async () => {
            const tags = await fetchProjectTags();
            setTags(tags);
        };

        loadCategories();
        loadTags();
    }, []);

    const fetchData = useCallback(
        (page, limit) =>
            fetchProjects(page, limit, {
                searchTerm,
                selectedTags,
                selectedCategories,
                selectedStatuses,
            }),
        [searchTerm, selectedCategories, selectedTags, selectedStatuses]
    );

    const handleEdit = (project) => {
        navigate(`/admin/project/${project.slug}`);
    };

    const statuses = [CONTENT_STATUSES.IN_PROGRESS, CONTENT_STATUSES.COMPLETED];

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by project title..."
                />
                <div className="flex flex-col md:flex-row gap-4">
                    <MultiSelectDropdown
                        label="Categories"
                        options={categories}
                        selectedOptions={selectedCategories}
                        setSelectedOptions={setSelectedCategories}
                    />
                    <MultiSelectDropdown
                        label="Tags"
                        options={tags}
                        selectedOptions={selectedTags}
                        setSelectedOptions={setSelectedTags}
                    />
                    <MultiSelectDropdown
                        label="Statuses"
                        options={statuses}
                        selectedOptions={selectedStatuses}
                        setSelectedOptions={setSelectedStatuses}
                    />
                </div>
            </div>
            <InfiniteScroll
                key={`${searchTerm}-${selectedCategories.join(
                    "-"
                )}-${selectedTags.join("-")}`} // force remount on filter change
                fetchData={fetchData}
                renderItem={(project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onEdit={handleEdit}
                    />
                )}
                limit={10}
                containerClass="grid grid-cols-1 xl:grid-cols-2 gap-4"
            />
        </div>
    );
};
