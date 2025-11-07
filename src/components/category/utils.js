import {
    fetchAllCategories,
    getTotalCategoriesCount,
} from "../../data/categories";

export const validateCategoryMetaData = (data, categories) => {
    const errors = {};

    // Check if name is empty
    if (!data.name.trim()) {
        errors.name = "Name is required";
    } else {
        // Check if name already exists (case-insensitive)
        const nameExists = categories.some(
            (category) =>
                category.name.toLowerCase() === data.name.trim().toLowerCase()
        );
        if (nameExists) {
            errors.name = "Name already exists";
        }
    }

    return errors;
};

export const getCategoryOptions = (categories) => {
    return categories.map((cat) => ({
        label: cat.name,
        value: cat.name,
    }));
};

export const addCategoryAndPrepare = async (newCategory) => {
    const categories = fetchAllCategories();
    return {
        totalCategories: getTotalCategoriesCount(),
        categories: [...categories, newCategory],
    };
};
