import {
    fetchAllCategories,
    getTotalCategoriesCount,
} from "../../data/categories";

export const validateCategoryMetaData = (data, categories, isEditing) => {
    const errors = {};

    // Check if name is empty
    if (!data.name.trim()) {
        errors.name = "Name is required";
    } else if (!isEditing) {
        // Check if name already exists (case-insensitive)
        const nameExists = categories.some(
            (category) =>
                category.toLowerCase() === data.name.trim().toLowerCase()
        );
        if (nameExists) {
            errors.name = "Name already exists";
        }
    }

    return errors;
};

export const getCategoryOptions = (categories) => {
    return categories.map((cat) => ({
        label: cat,
        value: cat,
    }));
};

export const mapCategoryToOption = (statusValue) => {
    return statusValue
        ? {
              label: safeInitial.category,
              value: safeInitial.category,
          }
        : "";
};

export const addCategoryAndPrepare = async (newCategory) => {
    const categories = await fetchAllCategories();
    const totalCategories = await getTotalCategoriesCount();
    return {
        totalCategories: totalCategories + 1,
        categories: [...categories, newCategory],
    };
};

export const updateCategoryAndPrepare = async (
    oldCategory,
    updatedCategory
) => {
    const categories = await fetchAllCategories();
    const totalCategories = await getTotalCategoriesCount();

    // Replace oldCategory with updatedCategory
    const updatedCategories = categories.map((cat) =>
        cat === oldCategory ? updatedCategory : cat
    );

    return {
        totalCategories,
        categories: updatedCategories,
    };
};
