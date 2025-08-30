import { useState, useEffect } from "react";
import Loader from "./Loader";

const DataLoader = ({ fetchData, render }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (error) {
                console.error("Failed to load data:", error);
                // Optionally, you could set an error state here
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [fetchData]); // Re-run the effect if the fetchData function changes

    if (isLoading) {
        // You can customize this loading message or replace it with a spinner component
        return <Loader />;
    }

    // Once data is loaded, call the render prop function with the data
    return render(data);
};

export default DataLoader;
