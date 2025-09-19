import { useRef } from "react";
import { useToolbarStore } from "../store/useToolbarStore";
import { useRenderLogger } from "../debugging/useRenderLogger";
import { ToolbarItems } from "./ToolbarItems";
import { ToolbarGrabber } from "./ToolbarGrabber";

const Toolbar = () => {
    const orientation = useToolbarStore((s) => s.orientation);
    const toolbarRef = useRef(null);

    useRenderLogger("Toolbar");

    return (
        <div
            className={`absolute bg-gray-100 border border-gray-300 rounded-md shadow-md p-2 cursor-default flex gap-2 ${
                orientation === "horizontal" ? "flex-row" : "flex-col"
            }`}
            ref={toolbarRef}
        >
            <ToolbarGrabber toolbarRef={toolbarRef} />
            <ToolbarItems orientation={orientation} />
        </div>
    );
};

export default Toolbar;
