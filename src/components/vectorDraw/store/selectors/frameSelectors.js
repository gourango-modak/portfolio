import { frameSlice } from "../utils";

export const useFrame = (frameId) =>
    frameSlice.useSliceProperty((s) => s.frames[frameId]);

export const useFrameOrder = () =>
    frameSlice.useSliceProperty((s) => s.frameOrder);

export const useActiveFrameId = () =>
    frameSlice.useSliceProperty((s) => s.activeFrameId);

export const useActiveFrameBgColor = () =>
    frameSlice.useSliceProperty((s) => {
        const activeId = s.activeFrameId;
        return s.frames[activeId]?.bgColor;
    });
