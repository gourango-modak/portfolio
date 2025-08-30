// Environment
export const IS_DEVENV = import.meta.env.MODE === "development";

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

export const SKILL_CATEGORIES = [
    {
        title: "Frontend",
        skills: [
            {
                name: "JavaScript (ES6+)",
                proficiency: "Expert",
                experience: "5 Years",
                iconClass: "devicon-javascript-plain",
            },
            {
                name: "React",
                proficiency: "Expert",
                experience: "4 Years",
                iconClass: "devicon-react-original",
            },
            {
                name: "Next.js",
                proficiency: "Proficient",
                experience: "2 Years",
                iconClass: "devicon-nextjs-original",
            },
            {
                name: "TypeScript",
                proficiency: "Familiar",
                experience: "1 Year",
                iconClass: "devicon-typescript-plain",
            },
            {
                name: "HTML5 & CSS3",
                proficiency: "Expert",
                experience: "5+ Years",
                iconClass: "devicon-html5-plain",
            },
            {
                name: "Tailwind CSS",
                proficiency: "Proficient",
                experience: "3 Years",
                iconClass: "devicon-tailwindcss-plain",
            },
        ],
    },
    {
        title: "Backend",
        skills: [
            {
                name: "Node.js",
                proficiency: "Expert",
                experience: "4 Years",
                iconClass: "devicon-nodejs-plain",
            },
            {
                name: "Express.js",
                proficiency: "Expert",
                experience: "4 Years",
                iconClass: "devicon-express-original",
            },
            {
                name: "Python",
                proficiency: "Proficient",
                experience: "3 Years",
                iconClass: "devicon-python-plain",
            },
            {
                name: "Django",
                proficiency: "Familiar",
                experience: "1 Year",
                iconClass: "devicon-django-plain",
            },
        ],
    },
    {
        title: "Databases & Caching",
        skills: [
            {
                name: "PostgreSQL",
                proficiency: "Proficient",
                experience: "3 Years",
                iconClass: "devicon-postgresql-plain",
            },
            {
                name: "MongoDB",
                proficiency: "Expert",
                experience: "3 Years",
                iconClass: "devicon-mongodb-plain",
            },
            {
                name: "Redis",
                proficiency: "Proficient",
                experience: "2 Years",
                iconClass: "devicon-redis-plain",
            },
        ],
    },
    {
        title: "Cloud & DevOps",
        skills: [
            {
                name: "Docker",
                proficiency: "Proficient",
                experience: "3 Years",
                iconClass: "devicon-docker-plain",
            },
            {
                name: "AWS",
                proficiency: "Proficient",
                experience: "3 Years",
                iconClass: "devicon-amazonwebservices-original",
            },
            {
                name: "GitHub Actions",
                proficiency: "Familiar",
                experience: "2 Years",
                iconClass: "devicon-github-original",
            },
            {
                name: "Git",
                proficiency: "Expert",
                experience: "5+ Years",
                iconClass: "devicon-git-plain",
            },
        ],
    },
];
