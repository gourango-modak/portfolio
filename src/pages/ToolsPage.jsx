import { PenTool, Type } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/section/SectionHeader";

const tools = [
    {
        name: "Canvas Studio",
        description:
            "Sketch, design, and visualize ideas on a flexible drawing board.",
        icon: PenTool,
        link: "/tools/canvas",
    },
    {
        name: "Notepad",
        description:
            "Write, style, and organize your thoughts in a clean, distraction-free editor.",
        icon: Type,
        link: "/tools/notepad",
    },
];

const ToolsPage = () => {
    return (
        <main className="pt-30 pb-20 section-m-h bg-gray-50/50">
            <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                <SectionHeader
                    title="My Productivity Toolkit"
                    text="These are applications I personally developed to streamline creative and technical workflows—making drawing, note-taking, blog writing, and creating technical documentation or diagrams seamless, efficient, and effortless."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tools.map((tool) => {
                        const Icon = tool.icon;
                        return (
                            <Link
                                to={tool.link}
                                key={tool.name}
                                className="group block bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4 group-hover:bg-indigo-600 transition-colors duration-300">
                                    <Icon className="text-indigo-600 group-hover:text-white w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    {tool.name}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    {tool.description}
                                </p>
                                <div className="mt-4">
                                    <span className="inline-block text-indigo-600 font-medium group-hover:underline">
                                        Launch &rarr;
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default ToolsPage;
