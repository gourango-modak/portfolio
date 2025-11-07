import { useCallback, useRef, useState } from "react";
import { Plus } from "lucide-react";
import InfiniteScroll from "../../components/common/InfiniteScroll";
import { SearchBar } from "../../components/common/SearchBar";
import { fetchCategories } from "../../data/categories";
import { downloadJson } from "../../utils/common";
import { CategoryCard } from "../../components/category/CategoryCard";
import { CategoryModal } from "../../components/category/CategoryModal";
import { CATEGORY_MANIFEST_FILE_NAME } from "../../config";
import { addCategoryAndPrepare } from "../../components/category/utils";

export const CategoriesPanel = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isMetaDataModalOpen, setMetaDataModalOpen] = useState(false);

    const metaDataRef = useRef({});
    const isEditingRef = useRef(false);

    const fetchData = useCallback(
        (page, limit) =>
            fetchCategories(page, limit, {
                searchTerm,
            }),
        [searchTerm]
    );

    const handleEdit = (category) => {
        metaDataRef.current = category;
        isEditingRef.current = true;
        setMetaDataModalOpen(true);
    };

    const saveMetaData = async (meta) => {
        const categoriesManifest = await addCategoryAndPrepare(meta.name);
        downloadJson(categoriesManifest, CATEGORY_MANIFEST_FILE_NAME);
        setMetaDataModalOpen(false);
        isEditingRef.current = false;
    };

    const handleMetaDataModalClose = (meta) => {
        metaDataRef.current = meta;
        isEditingRef.current = false;
        setMetaDataModalOpen(false);
    };

    const handleCreateCategory = () => {
        metaDataRef.current = {};
        setMetaDataModalOpen(true);
    };

    return (
        <>
            <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <SearchBar
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name..."
                    />
                    <div className="flex flex-col md:flex-row gap-4 w-full sm:w-auto">
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg cursor-pointer
                        flex items-center gap-2 justify-center"
                            onClick={handleCreateCategory}
                        >
                            <Plus size={18} /> Create
                        </button>
                    </div>
                </div>
                <InfiniteScroll
                    key={searchTerm} // force remount on filter change
                    fetchData={fetchData}
                    renderItem={(category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onEdit={handleEdit}
                        />
                    )}
                    limit={10}
                    containerClass="grid grid-cols-1 xl:grid-cols-3 gap-4"
                />
            </div>
            <CategoryModal
                isOpen={isMetaDataModalOpen}
                onClose={handleMetaDataModalClose}
                onSave={saveMetaData}
                initialData={metaDataRef.current}
                title={
                    isEditingRef.current ? "Edit Category" : "Create Category"
                }
            />
        </>
    );
};
