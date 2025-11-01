import { generateId } from "../../utils/common";

export const validateCategoryMetaData = (data) => {
    const errors = {};
    if (!data.name.trim()) errors.name = "Name is required";

    return errors;
};

export const prepareCategoryData = (metaData) => {
    const isEditing = Boolean(metaData?.id);
    const id = isEditing ? metaData.id : generateId();

    return {
        ...metaData,
        id: id,
        createdAt: isEditing ? metaData.createdAt : Date.now(),
    };
};

export const getCategoryOptions = (categories) => {
    return categories.map((cat) => ({
        label: cat.name,
        value: cat.id,
    }));
};
