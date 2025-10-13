import { GripHorizontal, GripVertical } from "lucide-react";
import { useRenderLogger } from "../../hooks/useRenderLogger";
import { ORIENTATION } from "../../../../utils/common";

export const ToolbarGrabber = ({ orientation }) => {
    useRenderLogger("ToolbarGrabber");

    return (
        <button
            title="Drag Toolbar"
            className="p-2 rounded-md duration-200 text-gray-700 cursor-grab active:cursor-grabbing flex items-center justify-center drag-handle"
        >
            {orientation === ORIENTATION.VERTICAL ? (
                <GripHorizontal className="w-5 h-5" />
            ) : (
                <GripVertical className="w-5 h-5" />
            )}
        </button>
    );
};
