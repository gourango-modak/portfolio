import { PenTool, Type } from "lucide-react";
import SectionHeader from "../components/section/SectionHeader";
import { ToolCard } from "../components/common/ToolCard";

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
                    {tools.map((tool) => (
                        <ToolCard key={tool.name} tool={tool} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default ToolsPage;
