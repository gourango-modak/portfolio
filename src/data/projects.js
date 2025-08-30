import { delay } from "../utils/common";
import { fetchAllData } from "./dataFetcher";

// Project-specific config
const projectBaseUrl =
    "https://raw.githubusercontent.com/gourango-modak/portfolio/refs/heads/master/public/data/projects/";

const projectFiles = ["1756556466389_projectnametaskmasterpro.json"];

export const fetchProjects = async (limit) => {
    await delay(10 * 1000);
    const projects = await fetchAllData(
        projectBaseUrl,
        projectFiles,
        "projects"
    );

    if (limit && Number.isInteger(limit) && limit > 0) {
        return projects.slice(0, limit);
    }

    return projects;
};
