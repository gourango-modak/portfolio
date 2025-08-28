export const formatProjectData = (formData) => {
    return {
        id: Date.now(),
        ...formData,
        tags: formData.tags?.split(",").map((tag) => tag.trim()) || [],
        features: formData.features?.split(",").map((f) => f.trim()) || [],
    };
};
