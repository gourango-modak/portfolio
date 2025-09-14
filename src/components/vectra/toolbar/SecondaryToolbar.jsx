import { ToolbarItem } from "./ToolbarItem";

export const SecondaryToolbar = ({
    items,
    mainButtonRect,
    orientation = "vertical",
    selectedTool,
    onSelect,
}) => {
    if (!mainButtonRect || !items.length) return null;

    const vertical = orientation === "vertical";
    const buttonSize = 42;
    const spacing = 8; // spacing between buttons
    const offset = 12; // gap between main and secondary toolbar
    const padding = 4;

    const totalLength =
        items.length * buttonSize + (items.length - 1) * spacing + padding * 2;

    const top = vertical
        ? mainButtonRect.top + mainButtonRect.height / 2 - totalLength / 2
        : mainButtonRect.top - offset - buttonSize - padding * 2;

    const left = vertical
        ? mainButtonRect.right + offset
        : mainButtonRect.left + mainButtonRect.width / 2 - totalLength / 2;

    return (
        <div
            style={{
                position: "fixed",
                top,
                left,
                display: "flex",
                flexDirection: vertical ? "column" : "row",
                gap: spacing,
                background: "#fff",
                padding: padding,
                borderRadius: 12,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                zIndex: 2000,
            }}
        >
            {items.map((item) => (
                <ToolbarItem
                    key={item.name}
                    icon={item.icon}
                    tooltip={item.tooltip}
                    selected={selectedTool === item.name}
                    onClick={() => onSelect(item.name)}
                    orientation={orientation}
                />
            ))}
        </div>
    );
};
