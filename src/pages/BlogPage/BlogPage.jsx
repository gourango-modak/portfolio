import BlogPageHeader from "./BlogPageHeader";
import EditorJsModal from "../../components/editorJs/EditorJsModal";
import PostMetaDataModal from "../../components/post/PostMetaDataModal";
import { CONTENT_TYPES } from "../../config";
import { usePostFilters } from "./../../components/post/hooks/usePostFilters";
import { useContentEditor } from "../../hooks/useContentEditor";
import { preparePostData } from "../../components/post/postUtils";
import PostsList from "../../components/post/PostsList";
import SearchInput from "./../../components/common/SearchInput";
import TagFilter from "./../../components/common/TagFilter";

const BlogPage = () => {
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
    } = useContentEditor(preparePostData);

    const {
        searchTerm,
        setSearchTerm,
        selectedTags,
        setSelectedTags,
        topTags,
        fetchData,
    } = usePostFilters();

    return (
        <>
            <section className="pt-30 pb-20 section-m-h bg-gray-50/50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <BlogPageHeader onAddClick={openEditorJsModal} />
                    <div className="mb-12">
                        <SearchInput onSearch={setSearchTerm} />
                        <TagFilter
                            topTags={topTags}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                            allLabel="All Posts"
                        />
                    </div>

                    <PostsList
                        fetchData={fetchData}
                        searchTerm={searchTerm}
                        selectedTag={selectedTags}
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
                contentType={CONTENT_TYPES.BLOG}
            />

            <PostMetaDataModal
                isOpen={isMetaDataModalOpen}
                onClose={closeMetaDataModal}
                onSave={saveMetaData}
                onBack={backToEditorJsModal}
                initialData={metaData}
            />
        </>
    );
};

export default BlogPage;
