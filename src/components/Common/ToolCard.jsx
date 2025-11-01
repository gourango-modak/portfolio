import { Link } from "react-router-dom";

export const ToolCard = ({ tool }) => {
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
            <p className="text-gray-500 text-sm">{tool.description}</p>
            <div className="mt-4">
                <span className="inline-block text-indigo-600 font-medium group-hover:underline">
                    Launch &rarr;
                </span>
            </div>
        </Link>
    );
};
