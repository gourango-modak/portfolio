import { fetchAllData } from "./dataFetcher";

// Project-specific config
const projectBaseUrl =
    "https://raw.githubusercontent.com/gourango-modak/portfolio/refs/heads/gh-pages/data/projects/";

const projectFiles = [
    "e-commerce-platform.json",
    "enterprise-crm-system.json",
    "real-time-analytics-dashboard.json",
    "1756502602833_project-case-study_taskly_smart-task-management-app.json",
];

export const fetchProjects = async (limit) => {
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
