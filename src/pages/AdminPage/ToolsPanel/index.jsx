import { PenTool, Type } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToolCard } from "./ToolCard";

export const ToolsPanel = () => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            <ToolCard
                title="Canvas Studio"
                description="Sketch, design, and visualize ideas on a flexible drawing board."
                icon={<PenTool size={24} />}
                onClick={() => navigate("/tools/canvas")}
            />
            <ToolCard
                title="Notepad"
                description="Write, style, and organize your thoughts in a clean, distraction-free editor."
                icon={<Type size={24} />}
                onClick={() => navigate("/tools/notepad")}
            />
            <ToolCard
                title="New Blog"
                description="Write your blog here"
                icon={<Type size={24} />}
                onClick={() => navigate("/admin/blog")}
            />
            <ToolCard
                title="New Project"
                description="Write your project here"
                icon={<Type size={24} />}
                onClick={() => navigate("/admin/project")}
            />
        </div>
    );
};
