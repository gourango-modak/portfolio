import React, { useState, useEffect } from "react";

/**
 * A reusable component that handles the logic for fetching data and displaying a loading state.
 * @param {Object} props - The component props.
 * @param {Function} props.fetchData - An async function that returns the data to be loaded.
 * @param {Function} props.render - A function that receives the loaded data and returns the JSX to render.
 * @returns {React.Component}
 */
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
		return (
			<div className="pt-32 min-h-screen text-center text-slate-500">
				Loading...
			</div>
		);
	}

	// Once data is loaded, call the render prop function with the data
	return render(data);
};

export default DataLoader;
