import { useRef } from "react";
import { GripHorizontal, GripVertical } from "lucide-react";
import { useToolbarStore } from "../store/useToolbarStore";
import { useDraggable } from "../hooks/useDraggable";
import { useRenderLogger } from "../debugging/useRenderLogger";
import { ORIENTATION } from "../../../utils/common";

export const ToolbarGrabber = ({ toolbarRef, orientation }) => {
    const setPosition = useToolbarStore((s) => s.setPosition);
    const dragHandlerRef = useRef(null);
    const initialPosition = useToolbarStore((s) => s.position);
    useDraggable({
        dragHandleRef: dragHandlerRef,
        draggableRef: toolbarRef,
        initialPosition,
        onPositionChange: setPosition,
    });

    useRenderLogger("ToolbarGrabber");

    return (
        <button
            ref={dragHandlerRef}
            title="Drag Toolbar"
            className="rounded-md duration-200 text-gray-700 cursor-grab active:cursor-grabbing flex items-center justify-center"
        >
            {orientation === ORIENTATION.VERTICAL ? (
                <GripHorizontal className="w-5 h-5" />
            ) : (
                <GripVertical className="w-5 h-5" />
            )}
        </button>
    );
};
