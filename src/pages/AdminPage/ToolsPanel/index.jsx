import { PenSquare, PenTool, PlusSquare, Type } from "lucide-react";
import { ToolCard } from "../../../components/common/ToolCard";

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
    {
        name: "Create New Blog",
        description: "Start writing and publishing a new blog post.",
        icon: PenSquare,
        link: "/admin/blog",
    },
    {
        name: "Add New Project",
        description: "Showcase your latest work by adding a new project.",
        icon: PlusSquare,
        link: "/admin/project",
    },
];

export const ToolsPanel = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {tools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
            ))}
        </div>
    );
};
