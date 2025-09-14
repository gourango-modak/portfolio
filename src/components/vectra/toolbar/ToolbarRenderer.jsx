import { ToolbarDragItem } from "./ToolbarDragItem";
import { ToolbarGroup } from "./ToolbarGroup";
import { ToolbarItem } from "./ToolbarItem";

export const ToolbarRenderer = ({
    items,
    store,
    actions,
    orientation,
    selectedTool,
    activeGroup,
    setActiveGroup,
    toolGroupRefs,
    groupIcons,
    setGroupIcons,
    mainButtonRect,
    setMainButtonRect,
    handleToolSelect,
    handleToolRightClick,
    colorPicker,
    dragging,
    handleMouseDown,
}) => {
    return items.map((group) => {
        // Drag handle
        if (group.type === "drag")
            return (
                <ToolbarDragItem
                    key={group.name}
                    onMouseDown={handleMouseDown}
                    dragging={dragging}
                    orientation={orientation}
                />
            );

        // Canvas color picker
        if (group.groupName === "canvasColor")
            return (
                <ToolbarItem
                    key={group.groupName}
                    tooltip={group.tooltip}
                    orientation={orientation}
                    icon={() => (
                        <div
                            className="w-[20px] h-[20px] rounded border border-gray-300"
                            style={{
                                backgroundColor:
                                    store.canvasSettings.infiniteBg,
                            }}
                        />
                    )}
                    onClick={() =>
                        colorPicker.open(
                            "infiniteBg",
                            store.canvasSettings.infiniteBg,
                            "Canvas Color"
                        )
                    }
                />
            );

        // Multi-tool groups
        if (group.tools?.length > 0)
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
                    onToolRightClick={handleToolRightClick}
                />
            );

        // Single tool
        return (
            <ToolbarItem
                key={group.name}
                icon={group.icon}
                tooltip={group.tooltip}
                selected={selectedTool === group.name}
                onClick={() =>
                    handleToolSelect({ name: group.name, action: group.action })
                }
                onContextMenu={(e) => handleToolRightClick(group, e)}
                orientation={orientation}
            />
        );
    });
};
