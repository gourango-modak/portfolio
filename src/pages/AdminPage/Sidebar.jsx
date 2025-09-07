import React from "react";
import {
    LayoutDashboard,
    FileText,
    Box,
    Tag,
    Settings,
    Menu,
    X,
    LogOut,
} from "lucide-react";

const Sidebar = ({ currentPage, onNavigate, sidebarOpen, setSidebarOpen }) => {
    const navItems = [
        {
            page: "dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard className="w-5 h-5" />,
        },
        {
            page: "blogs",
            label: "Blogs",
            icon: <FileText className="w-5 h-5" />,
        },
        {
            page: "projects",
            label: "Projects",
            icon: <Box className="w-5 h-5" />,
        },
        {
            page: "categories",
            label: "Categories",
            icon: <Tag className="w-5 h-5" />,
        },
        {
            page: "tools",
            label: "Tools",
            icon: <Settings className="w-5 h-5" />,
        },
    ];

    const handleLogout = () => {
        // Replace this with your logout logic
        console.log("User logged out");
        alert("Logged out!");
    };

    return (
        <>
            {/* Mobile menu button */}
            <button
                className="fixed top-8 right-6 z-50 md:hidden p-2 bg-indigo-600 text-white rounded-md shadow-lg"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? (
                    <X className="w-5 h-5" />
                ) : (
                    <Menu className="w-5 h-5" />
                )}
            </button>

            {/* Sidebar */}
            <div
                className={`
          fixed md:sticky top-0 left-0 z-40 flex flex-col justify-between bg-white border-r border-gray-200 h-screen
          transform transition-transform duration-300 ease-in-out
          ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0
          w-full md:w-64
        `}
            >
                {/* Logo */}
                <div className="flex items-center h-20 p-8 border-b border-gray-200 flex-shrink-0">
                    <span className="text-2xl font-bold text-indigo-600">
                        Gourango
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <button
                            key={item.page}
                            onClick={() => {
                                onNavigate(item.page);
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200 cursor-pointer
                ${
                    currentPage === item.page
                        ? "bg-gray-100 font-semibold text-indigo-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            <span className="capitalize">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="px-4 py-6 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full gap-2 p-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
