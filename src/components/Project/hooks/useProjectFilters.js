import { useState, useEffect, useCallback } from "react";
import { fetchProjects, getTopCategories } from "../../../data/projects";

export const useProjectFilters = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [topCategories, setTopCategories] = useState([]);

    useEffect(() => {
        const fetchTop = async () => {
            const categories = await getTopCategories();
            setTopCategories(categories);
        };
        fetchTop();
    }, []);

    const fetchData = useCallback(
        (page, limit) =>
            fetchProjects(page, limit, {
                searchTerm,
                selectedCategories,
            }),
        [searchTerm, selectedCategories]
    );

    return {
        searchTerm,
        setSearchTerm,
        selectedCategories,
        setSelectedCategories,
        topCategories,
        fetchData,
    };
};
