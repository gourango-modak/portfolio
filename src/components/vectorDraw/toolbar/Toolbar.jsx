import { useEffect, useRef } from "react";
import { useToolbarStore } from "../store/useToolbarStore";
import { useRenderLogger } from "../debugging/useRenderLogger";
import { ToolbarItems } from "./ToolbarItems";
import { ToolbarGrabber } from "./ToolbarGrabber";
import SettingsPanel from "./settings/SettingsPanel";
import { ORIENTATION } from "../../../utils/common";

const Toolbar = () => {
    const visible = useToolbarStore((s) => s.visible);
    const setPosition = useToolbarStore((s) => s.setPosition);
    const setVisibility = useToolbarStore((s) => s.setVisibility);
    const orientation = useToolbarStore((s) => s.orientation);
    const toolbarRef = useRef(null);

    useEffect(() => {
        if (!toolbarRef.current) return;
        const rect = toolbarRef.current.getBoundingClientRect();
        let x = 0;
        let y = 0;
        if (orientation === ORIENTATION.HORIZONTAL) {
            x = (window.innerWidth - rect.width) / 2;
            y = window.innerHeight - rect.height - 64;
        } else {
            x = 40;
            y = (window.innerHeight - rect.height) / 2;
        }
        toolbarRef.current.style.left = `${x}px`;
        toolbarRef.current.style.top = `${y}px`;
        setPosition({ x, y });
        setVisibility(true);
    }, [toolbarRef, visible]);

    useRenderLogger("Toolbar");

    return (
        <div
            className={`absolute bg-white border border-gray-300 rounded-xl shadow-md p-2 cursor-default gap-2 ${
                orientation === "horizontal" ? "flex-row" : "flex-col"
            } ${visible ? "flex" : "hidden"}`}
            ref={toolbarRef}
        >
            <ToolbarGrabber toolbarRef={toolbarRef} orientation={orientation} />
            <ToolbarItems orientation={orientation} />
            <SettingsPanel />
        </div>
    );
};

export default Toolbar;
