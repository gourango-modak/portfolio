import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { DashboardPanel } from "./DashboardPanel";
import { BlogsPanel } from "./BlogsPanel";
import ToolsPanel from "./ToolsPanel";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectsPanel } from "./ProjectsPanel";
import { CategoriesPanel } from "./CategoriesPanel";

const AdminPage = () => {
    const { page } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const currentPage = page || "dashboard";

    const handleNav = (newPage) => {
        navigate(`/admin/${newPage}`);
    };

    useEffect(() => {
        if (currentPage) {
            navigate(`/admin/${currentPage}`);
        }
    }, [currentPage]);

    const renderContent = () => {
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
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            {/* Sidebar */}
            <Sidebar
                currentPage={currentPage}
                onNavigate={handleNav}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Main content */}
            <main className="flex-1 px-6 sm:px-10 py-8 relative w-full">
                <h1 className="text-3xl font-bold mb-12 sm:mb-10 capitalize text-gray-800">
                    {currentPage}
                </h1>
                <div>{renderContent()}</div>
            </main>
        </div>
    );
};

export default AdminPage;
