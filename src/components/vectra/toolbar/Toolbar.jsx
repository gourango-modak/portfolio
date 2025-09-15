import { useState, useRef, useEffect } from "react";
import { useToolbarItems } from "./useToolbarItems";
import { createToolbarActionRegistry } from "./ToolbarActionRegistry";
import { useDragHandler } from "./useDragHandler";
import { ToolSettingsMenu } from "./ToolSettingsMenu";
import { FloatingColorPicker } from "./FloatingColorPicker";
import { ORIENTATION } from "../../../utils/common";
import { TOOLS } from "../tools/toolUtils";
import { useToolbarSettings } from "./useToolbarSettings";
import { ToolbarRenderer } from "./ToolbarRenderer";
import { useDrawingStore } from "../store/DrawingStoreContext";

export const Toolbar = () => {
    const store = useDrawingStore();
    const {
        toolbarSettings,
        selectedTool,
        updateToolbarPosition,
        setToolbarVisiblity,
    } = store;
    const { visible, position, orientation } = toolbarSettings;

    const items = useToolbarItems(store);
    const toolbarRef = useRef(null);
    const toolGroupRefs = useRef({});
    const [activeGroup, setActiveGroup] = useState(null);
    const [mainButtonRect, setMainButtonRect] = useState(null);
    const [groupIcons, setGroupIcons] = useState({});

    const actions = createToolbarActionRegistry(store);
    const { dragging, handleMouseDown } = useDragHandler(
        position,
        updateToolbarPosition
    );
    const isVertical = orientation === ORIENTATION.VERTICAL;

    useEffect(() => {
        if (!toolbarRef.current) return;
        const rect = toolbarRef.current.getBoundingClientRect();
        const x = (window.innerWidth - rect.width) / 2;
        const y = window.innerHeight - rect.height - 56;
        updateToolbarPosition({ x, y });
        setToolbarVisiblity(true);
    }, [toolbarRef]);

    const {
        settingsTool,
        closeSettingsMenu,
        handleSettingChange,
        handleToolSelect,
        handleToolRightClick,
        colorPicker,
    } = useToolbarSettings(store, selectedTool, actions);

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
                <ToolbarRenderer
                    items={items}
                    store={store}
                    actions={actions}
                    orientation={orientation}
                    selectedTool={selectedTool}
                    activeGroup={activeGroup}
                    setActiveGroup={setActiveGroup}
                    toolGroupRefs={toolGroupRefs}
                    groupIcons={groupIcons}
                    setGroupIcons={setGroupIcons}
                    mainButtonRect={mainButtonRect}
                    setMainButtonRect={setMainButtonRect}
                    handleToolSelect={handleToolSelect}
                    handleToolRightClick={handleToolRightClick}
                    colorPicker={colorPicker}
                    dragging={dragging}
                    handleMouseDown={handleMouseDown}
                />
            </div>

            {settingsTool && (
                <ToolSettingsMenu
                    tool={settingsTool}
                    onClose={closeSettingsMenu}
                    onChange={handleSettingChange}
                    openColorPicker={colorPicker.open}
                />
            )}

            {colorPicker.isOpen && selectedTool !== TOOLS.PAN.NAME && (
                <FloatingColorPicker
                    initialColor={colorPicker.value}
                    isOpen={colorPicker.isOpen}
                    onClose={colorPicker.close}
                    onChange={colorPicker.onChange}
                    title={colorPicker.title || "Color"}
                />
            )}
        </>
    );
};
