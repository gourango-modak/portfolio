import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import { DashboardPanel } from "./DashboardPanel";
import { BlogsPanel } from "./BlogsPanel";
import { ToolsPanel } from "./ToolsPanel";
import { ProjectsPanel } from "./ProjectsPanel";
import { CategoriesPanel } from "./CategoriesPanel";
import { useNavigate, useParams } from "react-router-dom";

const AdminPage = () => {
    const { page } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const currentPage = page || "dashboard";

    // Only navigate if page is missing from the URL
    if (!page) {
        navigate(`/admin/${currentPage}`, { replace: true });
    }

    const handleNav = (newPage) => {
        if (newPage !== currentPage) {
            navigate(`/admin/${newPage}`);
        }
    };

    // Memoize content to avoid unnecessary re-renders
    const content = useMemo(() => {
        switch (currentPage) {
            case "dashboard":
                return <DashboardPanel />;
            case "blogs":
                return <BlogsPanel />;
            case "projects":
                return <ProjectsPanel />;
            case "categories":
                return <CategoriesPanel />;
            case "tools":
                return <ToolsPanel />;
            default:
                return <DashboardPanel />;
        }
    }, [currentPage]);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            {/* Sidebar */}
            <Sidebar
                currentPage={currentPage}
                onNavigate={handleNav}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="md:hidden fixed top-0 left-0 right-0 z-30 px-8 pb-6 pt-8 bg-white border-b border-gray-200 md:static">
                <h1 className="text-2xl font-bold text-indigo-600 capitalize">
                    {currentPage}
                </h1>
            </div>
            <main className="flex-1 px-9 relative w-full pt-28 pb-10 md:py-9">
                <div>{content}</div>
            </main>
        </div>
    );
};

export default AdminPage;
