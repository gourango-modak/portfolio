import { useState } from "react";
import { DragHandle } from "./DragHandle";
import { ToolButton } from "./buttons/ToolButton";
import { SaveButton } from "./buttons/SaveButton";
import { TOOL_ICONS } from "./ToolIcons";
import { TOOLS } from "../svgEdtiorConfig";
import { useToolShortcuts } from "./../hooks/useToolShortcuts";
import { useToolbar } from "../context/ToolbarContext";

export const Toolbar = ({ saveAsImage }) => {
    const { orientation, setTool, visible, setVisible, position } =
        useToolbar();
    const [dragging, setDragging] = useState(false);

    const isVertical = orientation === "vertical";

    useToolShortcuts(
        {
            p: TOOLS.PEN,
            r: TOOLS.RECTANGLE,
            c: TOOLS.CIRCLE,
            a: TOOLS.ARROW,
            t: TOOLS.TEXT,
            s: TOOLS.MOVE,
            e: TOOLS.ERASER,
            h: () => setVisible(!visible),
        },
        (tool) => (typeof tool === "function" ? tool() : setTool(tool))
    );

    if (!visible) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: position.y,
                left: position.x,
                zIndex: 1000,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: isVertical ? "column" : "row",
                alignItems: "center",
                padding: "8px 12px",
                userSelect: "none",
                width: isVertical ? "52px" : "auto",
                height: isVertical ? "auto" : "52px",
                gap: "6px",
            }}
        >
            <DragHandle dragging={dragging} setDragging={setDragging} />

            {Object.values(TOOLS).map((t) => (
                <ToolButton key={t} tool={t} icon={TOOL_ICONS[t]} />
            ))}

            <SaveButton saveAsImage={saveAsImage} />
        </div>
    );
};
