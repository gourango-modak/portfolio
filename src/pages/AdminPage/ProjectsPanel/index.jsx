import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import InfiniteScroll from "./../../../components/common/InfiniteScroll";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../../components/common/SearchBar";
import { fetchProjects } from "./../../../data/projects";
import ProjectCard from "./../../../components/project/ProjectCard";
import { MultiSelectDropdown } from "../../../components/common/MultiSelectDropdown";
import { fetchAllCategories } from "../../../data/categories";

export const ProjectsPanel = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const [categories, setCategories] = useState([]);

    const tags = [
        "tutorial",
        "getting-started",
        "css",
        "frontend",
        "backend",
        "data",
        "performance",
    ];

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await fetchAllCategories();
            setCategories(categories.map((c) => c.name));
        };

        loadCategories();
    }, []);

    const fetchData = useCallback(
        (page, limit) =>
            fetchProjects(page, limit, {
                searchTerm,
                selectedTags,
                selectedCategories,
            }),
        [searchTerm, selectedCategories, selectedTags]
    );

    const handleEdit = (project) => {
        navigate(`/admin/project/${project.slug}`);
    };

    const handleCreateNewProject = () => {
        navigate("/admin/project");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title or author..."
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
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg cursor-pointer
                        flex items-center gap-2 justify-center"
                        onClick={handleCreateNewProject}
                    >
                        <Plus size={18} /> Create
                    </button>
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
