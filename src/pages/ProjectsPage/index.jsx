import ProjectPageHeader from "./ProjectsPageHeader";
import TagFilter from "../../components/common/TagFilter";
import SearchInput from "../../components/common/SearchInput";
import ProjectsList from "../../components/project/ProjectsList";
import { useProjectFilters } from "../../components/project/hooks/useProjectFilters";

const ProjectsPage = () => {
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
            <section className="pt-30 pb-30 min-h-screen bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                    <ProjectPageHeader />
                    <div className="mb-12">
                        <SearchInput onSearch={setSearchTerm} />
                        <TagFilter
                            topTags={topCategories}
                            selectedTags={selectedCategories}
                            setSelectedTags={setSelectedCategories}
                            allLabel="All Projects"
                        />
                    </div>

                    <ProjectsList
                        fetchData={fetchData}
                        searchTerm={searchTerm}
                        selectedCategories={selectedCategories}
                    />
                </div>
            </section>
        </>
    );
};

export default ProjectsPage;
