import { PROJECT_FILES_BASE_URL, PROJECT_MANIFEST_FILE_URL } from "../config";
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

export const fetchProjects = async () => {
    const projectFiles = await getProjectFiles();
    const projects = await fetchAllData(
        PROJECT_FILES_BASE_URL,
        projectFiles,
        "projects"
    );

    return projects;
};
