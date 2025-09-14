import { useState, useRef, useEffect } from "react";
import { ToolbarItem } from "./ToolbarItem";
import { useToolbarItems } from "./useToolbarItems";
import { useDrawingStore } from "../store/DrawingStoreContext";
import { ToolbarDragItem } from "./ToolbarDragItem";
import { createToolbarActionRegistry } from "./ToolbarActionRegistry";
import { useDragHandler } from "./useDragHandler";
import { ToolbarGroup } from "./ToolbarGroup";
import { ToolSettingsMenu } from "./ToolSettingsMenu";

export const Toolbar = () => {
    const store = useDrawingStore();
    const {
        toolbarSettings,
        selectedTool,
        updateToolbarPosition,
        setToolbarVisiblity,
        toolRegistry,
        updateToolSetting,
    } = store;
    const { visible, position, orientation } = toolbarSettings;

    const items = useToolbarItems();
    const toolbarRef = useRef(null);
    const toolGroupRefs = useRef({});
    const [activeGroup, setActiveGroup] = useState(null);
    const [mainButtonRect, setMainButtonRect] = useState(null);
    const [groupIcons, setGroupIcons] = useState({});

    const [settingsTool, setSettingsTool] = useState(null);

    const actions = createToolbarActionRegistry(store);
    const { dragging, handleMouseDown } = useDragHandler(
        position,
        updateToolbarPosition
    );
    const isVertical = orientation === "vertical";

    useEffect(() => {
        if (!toolbarRef.current) return;
        const rect = toolbarRef.current.getBoundingClientRect();
        const x = (window.innerWidth - rect.width) / 2;
        const y = window.innerHeight - rect.height - 56;
        updateToolbarPosition({ x, y });
        setToolbarVisiblity(true);
    }, [toolbarRef]);

    useEffect(() => {
        if (!settingsTool) return; // menu not open, do nothing
        const selTool = toolRegistry[selectedTool];
        if (selTool && selTool !== settingsTool) {
            setSettingsTool(selTool);
        }
    }, [selectedTool, settingsTool, toolRegistry]);

    const handleToolSelect = (item) => {
        actions[item.action]?.(item);
        setActiveGroup(null);
    };

    const handleToolRightClick = (tool, event) => {
        event.preventDefault();
        const selTool = toolRegistry[tool.name];
        setSettingsTool(selTool);
    };

    const handleSettingChange = (name, value) => {
        updateToolSetting(settingsTool.name, name, value);
        settingsTool.updateSettings({ [name]: value });
    };

    const closeSettingsMenu = () => {
        setSettingsTool(null);
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
                    opacity: visible ? 1 : 0,
                }}
            >
                {items.map((group) => {
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

                    if (group.tools.length === 1) {
                        const tool = group.tools[0];
                        return (
                            <ToolbarItem
                                key={tool.name}
                                icon={tool.icon}
                                tooltip={tool.tooltip}
                                selected={selectedTool === tool.name}
                                onClick={() => handleToolSelect(tool)}
                                onContextMenu={(e) =>
                                    handleToolRightClick(tool, e)
                                }
                                orientation={orientation}
                            />
                        );
                    }

                    return (
                        <ToolbarGroup
                            key={group.groupName}
                            group={group}
                            activeGroup={activeGroup}
                            setActiveGroup={setActiveGroup}
                            groupIcons={groupIcons}
                            setGroupIcons={setGroupIcons}
                            mainButtonRect={mainButtonRect}
                            setMainButtonRect={setMainButtonRect}
                            selectedTool={selectedTool}
                            actions={actions}
                            orientation={orientation}
                            toolGroupRefs={toolGroupRefs}
                            onToolRightClick={handleToolRightClick} // pass down to group items
                        />
                    );
                })}
            </div>

            {/* Tool Settings Menu */}
            {settingsTool && (
                <ToolSettingsMenu
                    tool={settingsTool}
                    onClose={closeSettingsMenu}
                    onChange={handleSettingChange}
                />
            )}
        </>
    );
};
