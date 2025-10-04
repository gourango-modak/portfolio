import { useRef, useState, useCallback, useMemo } from "react";
import { ToolButton } from "./ToolButton";
import { useToolbarStore } from "../store/useToolbarStore";
import { useRenderLogger } from "../hooks/useRenderLogger";
import { SecondaryToolbar } from "./SecondaryToolbar";
// import { useClickOutside } from "../hooks/useClickOutside";

export const ToolGroup = ({ item, orientation, onToolBtnClick }) => {
    const [selectedSubtool, setSelectedSubtool] = useState(null);
    const groupRef = useRef(null);

    const { group, tools, Icon, useSelectedIcon } = item;

    const activeGroup = useToolbarStore((s) => s.activeGroup);
    const setActiveGroup = useToolbarStore((s) => s.setActiveGroup);
    const rememberedSubtool = useToolbarStore((s) => s.groupSelections[group]);
    const isGroupActive = useToolbarStore((s) =>
        tools.some((t) => t.name === s.activeTool)
    );
    const setGroupSelection = useToolbarStore((s) => s.setGroupSelection);

    // const handleClickOutside = useCallback(() => {
    //     if (activeGroup === group) setActiveGroup(null);
    // }, [activeGroup, group, setActiveGroup]);

    // useClickOutside(groupRef, handleClickOutside);

    // pick group icon
    let GroupIcon = Icon;
    if (useSelectedIcon && rememberedSubtool) {
        const sub = tools.find((t) => t.name === rememberedSubtool);
        if (sub) GroupIcon = sub.Icon;
    }

    const handleGroupToolBtnClick = () => {
        if (activeGroup === group) {
            setActiveGroup(null);
        } else if (selectedSubtool) {
            onToolBtnClick(selectedSubtool);
            setActiveGroup(group);
        } else {
            setActiveGroup(group);
        }
    };

    const handleSubtoolClick = (subItem) => {
        if (subItem.isTool) {
            setSelectedSubtool(name);
            setGroupSelection(group, subItem.name);
        }

        setActiveGroup(null);
        onToolBtnClick(subItem);
    };

    const groupItem = useMemo(
        () => ({ name: group, Icon: GroupIcon }),
        [group, GroupIcon]
    );

    useRenderLogger("ToolGroup");

    return (
        <div className="relative" ref={groupRef}>
            <ToolButton
                item={groupItem}
                isSelected={isGroupActive}
                onClick={handleGroupToolBtnClick}
            />

            {activeGroup === group && (
                <SecondaryToolbar
                    tools={tools}
                    activeTool={rememberedSubtool}
                    onSubtoolClick={handleSubtoolClick}
                    orientation={orientation}
                />
            )}
        </div>
    );
};
