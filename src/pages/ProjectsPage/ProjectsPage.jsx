import ProjectPageHeader from "./ProjectsPageHeader";
import EditorJsModal from "../../components/editorJs/EditorJsModal";
import ProjectMetaDataModal from "../../components/project/ProjectMetaDataModal";
import TagFilter from "../../components/common/TagFilter";
import SearchInput from "../../components/common/SearchInput";
import { CONTENT_TYPES } from "../../config";
import ProjectsList from "../../components/project/ProjectsList";
import { useProjectFilters } from "../../components/project/hooks/useProjectFilters";
import { useContentEditor } from "../../hooks/useContentEditor";
import { prepareProjectData } from "../../components/project/projectUtils";

const ProjectsPage = () => {
    const {
        isEditorJsModalOpen,
        isMetaDataModalOpen,
        editorJsData,
        metaData,
        openEditorJsModal,
        closeEditorJsModal,
        saveEditorJsData,
        closeMetaDataModal,
        saveMetaData,
        backToEditorJsModal,
    } = useContentEditor(prepareProjectData);

    const {
        searchTerm,
        setSearchTerm,
        selectedCategories,
        setSelectedCategories,
        topCategories,
        fetchData,
    } = useProjectFilters();

    return (
        <>
            <section className="pt-30 pb-20 min-h-screen bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <ProjectPageHeader onAdd={openEditorJsModal} />
                    <div className="mb-12">
                        <SearchInput onSearch={setSearchTerm} />
                        <TagFilter
                            topTags={topCategories}
                            selectedTag={selectedCategories}
                            setSelectedTag={setSelectedCategories}
                            allLabel="All Projects"
                        />
                    </div>

                    <ProjectsList
                        fetchData={fetchData}
                        searchTerm={searchTerm}
                        selectedCategories={selectedCategories}
                        onEdit={openEditorJsModal}
                    />
                </div>
            </section>

            <EditorJsModal
                isOpen={isEditorJsModalOpen}
                onClose={closeEditorJsModal}
                onSave={saveEditorJsData}
                initialData={editorJsData}
                actionBtnTitle="Next"
                contentType={CONTENT_TYPES.PROJECT}
            />

            <ProjectMetaDataModal
                isOpen={isMetaDataModalOpen}
                onClose={closeMetaDataModal}
                onSave={saveMetaData}
                onBack={backToEditorJsModal}
                initialData={metaData}
            />
        </>
    );
};

export default ProjectsPage;
