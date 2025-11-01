import { Edit3, Layers } from "lucide-react";

export const CategoryCard = ({ category, onEdit }) => {
    return (
        <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200 hover:border-indigo-400 hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col sm:flex-row items-start gap-6 relative">
            <div className="flex flex-1 gap-6">
                <div className="text-indigo-600 mt-1 flex-shrink-0">
                    <Layers />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">
                    {category.name}
                </h3>
            </div>

            {onEdit && (
                <button
                    onClick={() => onEdit(category)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
                    title="Edit Category"
                >
                    <Edit3 size={16} className="text-gray-600" />
                </button>
            )}
        </div>
    );
};
