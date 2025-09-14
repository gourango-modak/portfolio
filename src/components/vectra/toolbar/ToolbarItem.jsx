import { useState, useRef } from "react";
import { createPortal } from "react-dom";

export const ToolbarItem = ({
    icon: Icon,
    tooltip,
    onClick,
    selected,
    onMouseDown,
    orientation = "vertical",
    onContextMenu,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const btnRef = useRef(null);

    const getTooltipStyle = () => {
        if (!btnRef.current) return {};
        const rect = btnRef.current.getBoundingClientRect();

        if (orientation === "vertical") {
            return {
                top: rect.top + rect.height / 2,
                left: rect.right + 8,
                transform: "translateY(-50%)",
            };
        } else {
            return {
                top: rect.bottom + 8, // 8px below
                left: rect.left + rect.width / 2,
                transform: "translateX(-50%)",
            };
        }
    };

    return (
        <div className="relative">
            <button
                ref={btnRef}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onContextMenu={onContextMenu}
                className={`w-[42px] h-[42px] flex items-center justify-center
                    transition-colors active:scale-95 rounded-[12px] cursor-pointer hover:bg-gray-100
                    ${
                        selected
                            ? "border bg-white border-gray-300 shadow-sm"
                            : ""
                    }`}
            >
                <Icon className="w-5 h-5 text-gray-700" />
            </button>

            {showTooltip &&
                tooltip &&
                createPortal(
                    <div
                        style={{
                            position: "fixed",
                            ...getTooltipStyle(),
                        }}
                        className="bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap
                                   shadow-md z-[9999] pointer-events-none"
                    >
                        {tooltip}
                    </div>,
                    document.body
                )}
        </div>
    );
};
