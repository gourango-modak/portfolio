import { useEffect, useRef } from "react";
import { GripVertical } from "lucide-react";
import MouseManager from "../MouseManager";
import { useToolbarStore } from "../store/useToolbarStore";

export const ToolbarGrabber = ({ toolbarRef }) => {
    const setPosition = useToolbarStore((s) => s.setPosition);
    const dragHandlerRef = useRef(null);
    const offsetRef = useRef({ x: 0, y: 0 });
    const initialPosition = useToolbarStore.getState().position;
    const positionRef = useRef(initialPosition);

    useEffect(() => {
        const manager = MouseManager.getInstance();
        const unsubscribe = manager.subscribe((type, e) => {
            if (type === MouseManager.EventType.DOWN) {
                offsetRef.current = {
                    x: e.clientX - positionRef.current.x,
                    y: e.clientY - positionRef.current.y,
                };
            } else if (type === MouseManager.EventType.MOVE) {
                if (!toolbarRef.current) return;
                toolbarRef.current.style.left = `${
                    e.clientX - offsetRef.current.x
                }px`;
                toolbarRef.current.style.top = `${
                    e.clientY - offsetRef.current.y
                }px`;
            } else if (type === MouseManager.EventType.UP) {
                positionRef.current = {
                    x: e.clientX - offsetRef.current.x,
                    y: e.clientY - offsetRef.current.y,
                };
                setPosition(positionRef.current);
            }
        }, dragHandlerRef.current);

        // Initialize position on mount
        if (toolbarRef.current) {
            toolbarRef.current.style.left = `${positionRef.current.x}px`;
            toolbarRef.current.style.top = `${positionRef.current.y}px`;
        }

        return () => unsubscribe();
    }, [setPosition, toolbarRef]);

    return (
        <button
            ref={dragHandlerRef}
            title="Drag Toolbar"
            className="rounded-md duration-200 text-gray-700 cursor-grab active:cursor-grabbing"
        >
            <GripVertical className="w-5 h-5" />
        </button>
    );
};
