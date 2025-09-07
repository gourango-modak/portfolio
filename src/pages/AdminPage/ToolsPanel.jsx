import { PenTool, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ToolCard = ({ title, description, icon, onClick }) => (
    <div
        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between cursor-pointer"
        onClick={onClick}
    >
        <div className="flex items-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 flex-1">{description}</p>
        <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer">
            Open {title}
        </button>
    </div>
);

const ToolsPanel = () => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Drawing Tool Card */}
            <ToolCard
                title="Drawing Tool"
                description="Create diagrams, sketches, and illustrations directly in your admin panel."
                icon={<PenTool size={24} />}
                onClick={() => navigate("/admin/tools/drawing")}
            />

            {/* Rich Text Editor Card */}
            <ToolCard
                title="Rich Text Editor"
                description="Write and format blog posts or content with our rich text editor."
                icon={<FileText size={24} />}
                onClick={() => navigate("/admin/tools/richtexteditor")}
            />
        </div>
    );
};

export default ToolsPanel;
