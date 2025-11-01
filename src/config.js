// Limits
export const BREADCRUMB_MAX_LENGTH = 18;
export const CARD_DESCRIPTION_MAX_LENGTH = 200;

// API simulation
export const SIMULATE_API_DELAY_SEC = 0;

export const BASE_URL =
    "https://raw.githubusercontent.com/gourango-modak/portfolio/refs/heads/master/public/data";
export const POST_FILES_BASE_URL = `${BASE_URL}/blogs`;
export const POSTS_MANIFEST_FILE_NAME = "posts-manifest.json";
export const POSTS_MANIFEST_FILE_URL = `${BASE_URL}/blogs/${POSTS_MANIFEST_FILE_NAME}`;

export const POST_TAGS_MANIFEST_FILE_NAME = "post-tags-manifest.json";
export const POST_TAGS_MANIFEST_FILE_URL = `${BASE_URL}/blogs/${POST_TAGS_MANIFEST_FILE_NAME}`;

export const PROJECT_FILES_BASE_URL = `${BASE_URL}/projects`;
export const PROJECTS_MANIFEST_FILE_NAME = "projects-manifest.json";
export const PROJECT_MANIFEST_FILE_URL = `${BASE_URL}/projects/${PROJECTS_MANIFEST_FILE_NAME}`;

export const PROJECT_TAGS_MANIFEST_FILE_NAME = "project-tags-manifest.json";
export const PROJECT_TAGS_MANIFEST_FILE_URL = `${BASE_URL}/projects/${PROJECT_TAGS_MANIFEST_FILE_NAME}`;

export const CATEGORY_FILES_BASE_URL = `${BASE_URL}/categories`;
export const CATEGORY_MANIFEST_FILE_NAME = "categories-manifest.json";
export const CATEGORY_MANIFEST_FILE_URL = `${BASE_URL}/categories/${CATEGORY_MANIFEST_FILE_NAME}`;

export const CONTENT_TYPES = {
    BLOG: "blog",
    PROJECT: "project",
};

export const NAV_LINKS = [
    { to: "/projects", label: "Projects" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

export const SKILLS = [
    {
        category: "Backend",
        skills: [
            "C#",
            "C++",
            "Python",
            ".NET Core & ASP.NET Core",
            ".NET Framework",
            "LINQ",
            "SignalR",
            "RESTful API Design",
        ],
    },
    {
        category: "Frontend",
        skills: [
            "JavaScript",
            "React",
            "HTML5",
            "CSS3",
            "Responsive Web Design",
        ],
    },
    {
        category: "Databases",
        skills: [
            "MySQL",
            "MS SQL Server",
            "Entity Framework Core",
            "PostgreSQL",
            "Database Design & Normalization",
            "Query Optimization & Indexing",
        ],
    },
    {
        category: "Cloud & DevOps",
        skills: [
            "Azure",
            "AWS S3",
            "CI/CD Pipelines",
            "Docker & Containerization",
        ],
    },
    {
        category: "Version Control",
        skills: [
            "Git",
            "GitHub",
            "Bitbucket",
            "Branching & Merging Strategies",
        ],
    },
];
