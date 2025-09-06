import { useState, useEffect, useCallback } from "react";
import { fetchPosts, getTopTags } from "../../../data/posts";

export const usePostFilters = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [topTags, setTopTags] = useState([]);

    useEffect(() => {
        const fetchTop = async () => {
            const topTags = await getTopTags();
            setTopTags(topTags);
        };
        fetchTop();
    }, []);

    const fetchData = useCallback(
        (page, limit) =>
            fetchPosts(page, limit, {
                searchTerm,
                selectedTags,
            }),
        [searchTerm, selectedTags]
    );

    return {
        searchTerm,
        setSearchTerm,
        selectedTags,
        setSelectedTags,
        topTags,
        fetchData,
    };
};
