import { useEffect, useState } from "react";
import ProjectPageHeader from "./ProjectsPageHeader";
import DataLoader from "../../components/common/DataLoader";
import ProjectList from "../../components/project/ProjectList";
import ProjectMetaDataModal from "../../components/project/ProjectMetaDataModal";
import EditorJsModal from "../../components/editorJs/EditorJsModal";
import { downloadJson, getContentFileName } from "../../utils/common";
import { CONTENT_TYPES } from "../../config";
import { prepareProjectData } from "../../components/project/projectUtils";
import { getTopCategories, fetchProjects } from "../../data/projects";
import SearchBar from "../../components/common/SearchBar";
import TagFilter from "../../components/common/TagFilter";
import InfiniteScroll from "../../components/Common/InfiniteScroll";
import ProjectCard from "../../components/project/ProjectCard";

const ProjectsPage = () => {
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isProjectMetaDataModalOpen, setIsProjectMetaDataModalOpen] =
        useState(false);
    const [editorJsData, setEditorJsData] = useState(null);
    const [metaData, setMetaData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [topCategories, setTopCategories] = useState([]);

    const handleAddProject = () => {
        setIsEditorModalOpen(true);
        setEditorJsData(null);
        setMetaData(null);
    };

    const handleEditorJsModalSave = (data) => {
        setEditorJsData(data);
        setIsEditorModalOpen(false);
        setIsProjectMetaDataModalOpen(true);
    };

    const handleEditorJsModalClose = () => {
        setEditorJsData(null);
        setMetaData(null);
        setIsEditorModalOpen(false);
    };

    const handleProjectMetaDataModalClose = () => {
        setIsProjectMetaDataModalOpen(false);
        setIsEditorModalOpen(false);
        setEditorJsData(null);
        setMetaData(null);
    };

    const handleProjectMetaDataModalSave = (metaData) => {
        const projectData = prepareProjectData(editorJsData, metaData);
        downloadJson(
            projectData,
            getContentFileName(projectData.title, projectData.id)
        );

        setIsProjectMetaDataModalOpen(false);
        setEditorJsData(null);
        setMetaData(null);
    };

    const handleProjectMetaDataModalBack = (metaData) => {
        setMetaData(metaData);
        setIsProjectMetaDataModalOpen(false);
        setIsEditorModalOpen(true);
    };

    const handleEdit = (project) => {
        setIsEditorModalOpen(true);
        setEditorJsData(project.content);
        setMetaData(project);
    };

    useEffect(() => {
        const fetchTopCategories = async () => {
            const categories = await getTopCategories();
            setTopCategories(categories);
        };
        fetchTopCategories();
    }, []);

    // Filter projects based on search & selected category
    // const filteredProjects = useMemo(() => {
    //     return projects.filter((project) => {
    //         const titleMatch = project.title
    //             .toLowerCase()
    //             .includes(searchTerm.toLowerCase());

    //         const categoryMatch = selectedCategory
    //             ? project.category === selectedCategory
    //             : true;

    //         return titleMatch && categoryMatch;
    //     });
    // }, [searchTerm, selectedCategory, projects]);

    return (
        <>
            <section className="pt-30 pb-20 min-h-screen bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <ProjectPageHeader onAdd={handleAddProject} />
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
                    <div>
                        <InfiniteScroll
                            fetchData={fetchProjects} // fetches pages from manifest
                            renderItem={(project) => (
                                <ProjectCard
                                    key={project.url}
                                    project={project}
                                    onEdit={handleEdit}
                                />
                            )}
                            pageSize={10}
                            containerClasses="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pb-10"
                        />
                    </div>
                    {/* <DataLoader
                        fetchData={fetchProjects}
                        render={(projects) => (
                            <ProjectList projects={projects} />
                        )}
                    /> */}
                </div>
            </section>
            <EditorJsModal
                isOpen={isEditorModalOpen}
                onClose={handleEditorJsModalClose}
                onSave={handleEditorJsModalSave}
                initialData={editorJsData}
                actionBtnTitle="Next"
                contentType={CONTENT_TYPES.PROJECT}
            />
            <ProjectMetaDataModal
                isOpen={isProjectMetaDataModalOpen}
                onClose={handleProjectMetaDataModalClose}
                onSave={handleProjectMetaDataModalSave}
                onBack={handleProjectMetaDataModalBack}
                initialData={metaData}
            />
        </>
    );
};

export default ProjectsPage;
