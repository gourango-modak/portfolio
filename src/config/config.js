import { CUSTOM_TOOLS } from "./editorJs/editorTools";
import EditorJsHeaderBlock from "./../components/EditorJs/Blocks/EditorJsHeaderBlock";
import EditorJsParagraphBlock from "./../components/EditorJs/Blocks/EditorJsParagraphBlock";
import EditorJsListBlock from "./../components/EditorJs/Blocks/EditorJsListBlock";
import EditorJsImageBlock from "./../components/EditorJs/Blocks/EditorJsImageBlock";
import EditorJsCodeBlock from "./../components/EditorJs/Blocks/EditorJsCodeBlock";
import EditorJsGalleryBlock from "./../components/EditorJs/Blocks/EditorJsGalleryBlock";

// Limits
export const BREADCRUMB_MAX_LENGTH = 18;
export const CARD_DESCRIPTION_MAX_LENGTH = 200;

// API simulation
export const SIMULATE_API_DELAY = false;

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

export const NON_RENDER_EDITORJS_BLOCKS = [
    CUSTOM_TOOLS.TITLE.TYPE,
    CUSTOM_TOOLS.TAGLINE.TYPE,
    CUSTOM_TOOLS.TAGLIST.TYPE,
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

export const EDITORJS_BLOCKS = {
    header: EditorJsHeaderBlock,
    paragraph: EditorJsParagraphBlock,
    list: EditorJsListBlock,
    image: EditorJsImageBlock,
    code: EditorJsCodeBlock,
    gallery: EditorJsGalleryBlock,
};
