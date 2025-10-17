import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactPage from "./pages/ContactPage";
import ToolsPage from "./pages/ToolsPage";
import CanvasStudioPage from "./pages/CanvasStudioPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import NotepadPage from "./pages/NotepadPage";

export const ROUTES = [
    { path: "/", component: HomePage, layout: true },
    { path: "/about", component: AboutPage, layout: true },
    { path: "/blog", component: BlogPage, layout: true },
    { path: "/blog/:slug", component: PostDetailPage, layout: true },
    { path: "/projects", component: ProjectsPage, layout: true },
    { path: "/projects/:slug", component: ProjectDetailPage, layout: true },
    { path: "/contact", component: ContactPage, layout: true },
    { path: "/tools", component: ToolsPage, layout: true },
    {
        path: "/tools/canvas",
        component: CanvasStudioPage,
    },
    {
        path: "/tools/notepad",
        component: NotepadPage,
    },
    { path: "/login", component: LoginPage },
    { path: "/admin", component: AdminPage },
    {
        path: "/admin/:page",
        component: AdminPage,
    },
];
