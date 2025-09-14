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
    const toolGroupRefs = useRef({});

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

    const handleGroupToolSelect = (groupName, item) => {
        actions[item.action]?.(item);
        setGroupIcons((prev) => ({ ...prev, [groupName]: item.icon }));
        setActiveGroup(null);
    };

    const handleToolSelect = (item) => {
        actions[item.action]?.(item);
        setActiveGroup(null);
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
                {items.map((group) => {
                    // const buttonRef = useRef(null);

                    // Drag handle
                    if (group.type === "drag") {
                        return (
                            <ToolbarDragItem
                                key={group.groupName}
                                onMouseDown={handleMouseDown}
                                dragging={dragging}
                                orientation={orientation}
                            />
                        );
                    }

                    // Single tool group
                    if (group.tools.length === 1) {
                        const tool = group.tools[0];
                        return (
                            <ToolbarItem
                                key={tool.name}
                                icon={tool.icon}
                                tooltip={!dragging ? tool.tooltip : null}
                                selected={selectedTool === tool.name}
                                onClick={() => handleToolSelect(tool)}
                                orientation={orientation}
                            />
                        );
                    }

                    // Grouped tools
                    const activeIcon =
                        group.changeGroupIcon && groupIcons[group.groupName]
                            ? groupIcons[group.groupName]
                            : group.groupIcon;

                    return (
                        <div
                            key={group.groupName}
                            ref={(el) =>
                                (toolGroupRefs.current[group.groupName] = el)
                            }
                        >
                            <ToolbarItem
                                icon={activeIcon}
                                tooltip={
                                    !dragging ? group.tools[0].tooltip : null
                                }
                                selected={group.tools.some(
                                    (t) => t.name === selectedTool
                                )}
                                onClick={() => {
                                    const el =
                                        toolGroupRefs.current[group.groupName];
                                    if (el)
                                        setMainButtonRect(
                                            el.getBoundingClientRect()
                                        );
                                    setActiveGroup((prev) =>
                                        prev === group.groupName
                                            ? null
                                            : group.groupName
                                    );
                                }}
                                orientation={orientation}
                            />
                            {activeGroup === group.groupName && (
                                <SecondaryToolbar
                                    items={group.tools}
                                    mainButtonRect={mainButtonRect}
                                    orientation={orientation}
                                    selectedTool={selectedTool}
                                    onSelect={(toolName) => {
                                        const selectedItem = group.tools.find(
                                            (t) => t.name === toolName
                                        );
                                        handleGroupToolSelect(
                                            group.groupName,
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
