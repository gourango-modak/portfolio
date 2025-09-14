import { useRef, useState } from "react";
import { ToolSettingField } from "./ToolSettingField";
import { ToolSettingsMenuHeader } from "./ToolSettingsMenuHeader";
import { useDragHandler } from "./useDragHandler";

export const ToolSettingsMenu = ({ tool, onClose, onChange }) => {
    const menuRef = useRef(null);
    const [pos, setPos] = useState({ x: 100, y: 100 }); // default position
    const { dragging, handleMouseDown } = useDragHandler(pos, setPos);

    if (!tool) return null;

    return (
        <div
            ref={menuRef}
            style={{
                position: "fixed",
                top: pos.y,
                left: pos.x,
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                width: "300px",
                maxWidth: "90vw",
                maxHeight: "80vh",
                overflowY: "auto",
                zIndex: 2000,
                userSelect: dragging ? "none" : "auto",
            }}
        >
            <ToolSettingsMenuHeader
                title={tool.label || tool.name}
                onClose={onClose}
                onMouseDown={handleMouseDown}
            />
            <div style={{ padding: "12px" }}>
                {tool.settings &&
                    Object.entries(tool.settings).map(([key, value]) => (
                        <ToolSettingField
                            key={key}
                            keyName={key}
                            value={value}
                            onChange={onChange}
                        />
                    ))}
            </div>
        </div>
    );
};
