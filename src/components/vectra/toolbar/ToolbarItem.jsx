import { TooltipWrapper } from "./TooltipWrapper";

export const ToolbarItem = ({
    icon: Icon,
    tooltip,
    onClick,
    selected,
    onMouseDown,
    orientation = "vertical",
    onContextMenu,
}) => {
    return (
        <TooltipWrapper tooltip={tooltip} orientation={orientation}>
            <button
                onClick={onClick}
                onMouseDown={onMouseDown}
                onContextMenu={onContextMenu}
                className={`w-[42px] h-[42px] flex items-center justify-center
                    transition-colors active:scale-95 rounded-[12px] cursor-pointer hover:bg-gray-100
                    ${
                        selected
                            ? "border bg-white border-gray-300 shadow-sm"
                            : ""
                    }`}
            >
                {typeof Icon === "function" ? (
                    <Icon />
                ) : (
                    <Icon className="w-5 h-5 text-gray-700" />
                )}
            </button>
        </TooltipWrapper>
    );
};
