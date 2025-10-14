import { useRef, useState, useMemo, useEffect } from "react";
import { ToolButton } from "./ToolButton";
import { useRenderLogger } from "../../hooks/useRenderLogger";
import { SecondaryToolbar } from "./SecondaryToolbar";
import { toolbarSlice } from "../../store/utils";
import {
    useActiveGroup,
    useIsActiveToolInGroup,
    useSelectedSubtoolForGroup,
} from "../../store/selectors/toolbarSelectors";
import { isRegisteredTool } from "./../../tools/utils";
import { useCanvasMode } from "../../store/selectors/canvasPropertiesSelectors";

export const ToolGroup = ({ item, orientation, onToolBtnClick }) => {
    const [selectedSubtool, setSelectedSubtool] = useState(null);
    const groupRef = useRef(null);

    const { group, tools, Icon, useSelectedIcon } = item;

    const canvasMode = useCanvasMode();
    const activeGroup = useActiveGroup();
    const rememberedSubtool = useSelectedSubtoolForGroup(group);
    const isGroupActive = useIsActiveToolInGroup(tools);

    const { setActiveGroup } = toolbarSlice.getSlice();
    const { setGroupSelection } = toolbarSlice.getSlice();

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
        if (isRegisteredTool(subItem.name)) {
            setSelectedSubtool(subItem);
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

    const shouldShow = item?.visible?.({ canvasMode }) ?? true;

    return (
        <div
            ref={groupRef}
            className={`relative ${shouldShow ? "" : "hidden"}`}
        >
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
