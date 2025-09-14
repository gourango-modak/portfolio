import { SecondaryToolbar } from "./SecondaryToolbar";
import { ToolbarItem } from "./ToolbarItem";

export const ToolbarGroup = ({
    group,
    activeGroup,
    setActiveGroup,
    groupIcons,
    setGroupIcons,
    mainButtonRect,
    setMainButtonRect,
    selectedTool,
    actions,
    orientation,
    toolGroupRefs,
}) => {
    const handleGroupToolSelect = (item) => {
        actions[item.action]?.(item);
        setGroupIcons((prev) => ({ ...prev, [group.groupName]: item.icon }));
        setActiveGroup(null);
    };

    const activeIcon =
        group.changeGroupIcon && groupIcons[group.groupName]
            ? groupIcons[group.groupName]
            : group.groupIcon;

    return (
        <div ref={(el) => (toolGroupRefs.current[group.groupName] = el)}>
            <ToolbarItem
                icon={activeIcon}
                tooltip={group.tools[0].tooltip}
                selected={group.tools.some((t) => t.name === selectedTool)}
                onClick={() => {
                    const el = toolGroupRefs.current[group.groupName];
                    if (el) setMainButtonRect(el.getBoundingClientRect());
                    setActiveGroup((prev) =>
                        prev === group.groupName ? null : group.groupName
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
                        handleGroupToolSelect(selectedItem);
                    }}
                />
            )}
        </div>
    );
};
