import { toolbarSlice } from "../utils";

export const useActiveTool = () =>
    toolbarSlice.useSliceProperty((s) => s.activeTool);

export const useIsActiveTool = (name) =>
    toolbarSlice.useSliceProperty((s) => s.activeTool === name);

export const useActiveGroup = () =>
    toolbarSlice.useSliceProperty((s) => s.activeGroup);

export const useSelectedSubtoolForGroup = (group) =>
    toolbarSlice.useSliceProperty((s) => s.groupSelections[group]);

export const useIsActiveToolInGroup = (groupTools) =>
    toolbarSlice.useSliceProperty((s) =>
        groupTools.some((t) => t.name === s.activeTool)
    );
