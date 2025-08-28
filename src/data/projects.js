import { fetchAllData } from "./dataFetcher";

// Project-specific config
const projectBaseUrl =
	"https://raw.githubusercontent.com/gourango-modak/portfolio/refs/heads/gh-pages/data/projects/";

const projectFiles = [
	"e-commerce-platform.json",
	"enterprise-crm-system.json",
	"real-time-analytics-dashboard.json",
];

// Export a ready-to-use function
export const fetchAllProjects = () =>
	fetchAllData(projectBaseUrl, projectFiles, "projects");
