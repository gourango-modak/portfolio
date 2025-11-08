import { useCallback, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { SearchBar } from "../../components/common/SearchBar";
import { fetchCategories } from "../../data/categories";
import { downloadJson } from "../../utils/common";
import { CategoryCard } from "../../components/category/CategoryCard";
import { CategoryModal } from "../../components/category/CategoryModal";
import { CATEGORY_MANIFEST_FILE_NAME } from "../../config";
import {
    addCategoryAndPrepare,
    updateCategoryAndPrepare,
} from "../../components/category/utils";
import ResourceLoader from "../../components/common/ResourceLoader";

export const CategoriesPanel = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isMetaDataModalOpen, setMetaDataModalOpen] = useState(false);

    const metaDataRef = useRef({});
    const isEditingRef = useRef(false);

    const fetchData = useCallback(
        () =>
            fetchCategories({
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
        let categoriesManifest;

        if (isEditingRef.current) {
            categoriesManifest = await updateCategoryAndPrepare(
                metaDataRef.current,
                meta.name
            );
        } else {
            categoriesManifest = await addCategoryAndPrepare(meta.name);
        }

        downloadJson(categoriesManifest, CATEGORY_MANIFEST_FILE_NAME);
        setMetaDataModalOpen(false);
        isEditingRef.current = false;
        metaDataRef.current = "";
    };

    const handleMetaDataModalClose = (meta) => {
        metaDataRef.current = meta;
        isEditingRef.current = false;
        setMetaDataModalOpen(false);
    };

    const handleCreateCategory = () => {
        metaDataRef.current = "";
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <ResourceLoader
                        fetchFn={fetchData}
                        loadingMessage="Fetching categories..."
                    >
                        {(categories) => {
                            return categories.map((cat) => (
                                <CategoryCard
                                    key={cat}
                                    category={cat}
                                    onEdit={handleEdit}
                                />
                            ));
                        }}
                    </ResourceLoader>
                </div>
            </div>
            <CategoryModal
                isOpen={isMetaDataModalOpen}
                onClose={handleMetaDataModalClose}
                onSave={saveMetaData}
                initialData={metaDataRef.current}
                title={
                    isEditingRef.current ? "Edit Category" : "Create Category"
                }
                isEditing={isEditingRef.current}
            />
        </>
    );
};
