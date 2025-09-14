import { useState, useRef, useEffect } from "react";
import { ToolbarItem } from "./ToolbarItem";
import { SecondaryToolbar } from "./SecondaryToolbar";
import { useToolbarItems } from "./useToolbarItems";
import { useDrawingStore } from "../store/DrawingStoreContext";
import { ToolbarDragItem } from "./ToolbarDragItem";
import { createToolbarActionRegistry } from "./ToolbarActionRegistry";

export const Toolbar = ({ saveAsImage }) => {
    const store = useDrawingStore();
    const { toolbarSettings, selectedTool, updateToolbarPosition } = store;
    const { visible, position, orientation } = toolbarSettings;

    const [dragging, setDragging] = useState(false);
    const [activeGroup, setActiveGroup] = useState(null);
    const [mainButtonRect, setMainButtonRect] = useState(null);
    const [groupIcons, setGroupIcons] = useState({}); // store active icons per group

    const draggingOffsetRef = useRef({ x: 0, y: 0 });
    const items = useToolbarItems(saveAsImage);
    const toolbarRef = useRef(null);

    if (!visible) return null;
    const isVertical = orientation === "vertical";
    const actions = createToolbarActionRegistry(store);

    const handleMouseDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragging(true);
        setActiveGroup(null);
        draggingOffsetRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    const handleMouseMove = (e) => {
        if (!dragging || e.buttons !== 1) return;
        e.stopPropagation();
        e.preventDefault();
        updateToolbarPosition({
            x: e.clientX - draggingOffsetRef.current.x,
            y: e.clientY - draggingOffsetRef.current.y,
        });
    };

    const handleMouseUp = (e) => {
        if (!dragging) return;
        e.stopPropagation();
        e.preventDefault();
        setDragging(false);
    };

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging]);

    // Group items
    const groupedItems = items.reduce((acc, item) => {
        if (!item.group) {
            acc[item.key] = [item];
        } else {
            acc[item.group] = acc[item.group] || [];
            acc[item.group].push(item);
        }
        return acc;
    }, {});

    const handleGroupToolClick = (groupName, buttonRef) => {
        const rect = buttonRef.current?.getBoundingClientRect();
        setMainButtonRect(rect);
        setActiveGroup((prev) => (prev === groupName ? null : groupName));
    };

    const handleGroupToolSelect = (groupName, item) => {
        actions[item.action]?.(item);
        setGroupIcons((prev) => ({ ...prev, [groupName]: item.icon }));
        setActiveGroup(null);
    };

    const handleToolSelect = (item) => {
        actions[item.action]?.(item);
    };

    return (
        <>
            <div
                ref={toolbarRef}
                style={{
                    position: "fixed",
                    top: position.y,
                    left: position.x,
                    zIndex: 1000,
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: isVertical ? "column" : "row",
                    alignItems: "center",
                    padding: "4px",
                    gap: "8px",
                    userSelect: "none",
                }}
            >
                {Object.entries(groupedItems).map(([groupName, group]) => {
                    const buttonRef = useRef(null);

                    // Drag handle
                    if (group[0].type === "drag") {
                        return (
                            <ToolbarDragItem
                                key={groupName}
                                onMouseDown={handleMouseDown}
                                dragging={dragging}
                                orientation={orientation}
                            />
                        );
                    }

                    // Single tool
                    if (group.length === 1) {
                        const item = group[0];
                        return (
                            <ToolbarItem
                                key={item.name}
                                icon={item.icon}
                                tooltip={!dragging ? item.tooltip : null}
                                selected={selectedTool === item.name}
                                onClick={() => handleToolSelect(item)}
                                orientation={orientation}
                            />
                        );
                    }

                    // Grouped tools
                    const activeIcon = groupIcons[groupName] || group[0].icon;

                    return (
                        <div key={groupName} ref={buttonRef}>
                            <ToolbarItem
                                icon={activeIcon}
                                tooltip={!dragging ? group[0].tooltip : null}
                                selected={group.some(
                                    (i) => i.name === selectedTool
                                )}
                                onClick={() =>
                                    handleGroupToolClick(groupName, buttonRef)
                                }
                                orientation={orientation}
                            />
                            {activeGroup === groupName && (
                                <SecondaryToolbar
                                    items={group}
                                    mainButtonRect={mainButtonRect}
                                    orientation={orientation}
                                    selectedTool={selectedTool}
                                    onSelect={(toolName) => {
                                        const selectedItem = group.find(
                                            (i) => i.name === toolName
                                        );
                                        handleGroupToolSelect(
                                            groupName,
                                            selectedItem
                                        );
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};
