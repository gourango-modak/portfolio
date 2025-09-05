import { PROJECT_MANIFEST_FILE_URL } from "../config";
import { fetchAllData } from "./dataFetcher";

let cachedProjectFiles = null; // cache manifest in memory

const getProjectFiles = async () => {
    if (!cachedProjectFiles) {
        cachedProjectFiles = await fetch(PROJECT_MANIFEST_FILE_URL).then(
            (res) => res.json()
        );
    }
    return cachedProjectFiles;
};

export const fetchProjects = async (limit) => {
    const projectFiles = await getProjectFiles();
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
