import { useRenderLogger } from "../../hooks/useRenderLogger";
import {
    useSelectedShapeIds,
    useSelectedShapesBounds,
} from "../../store/selectors/shapeSelectors";
import {
    useSelectedFrameIds,
    useSelectedFramesBounds,
} from "../../store/selectors/frameSelectors";
import { shapeSlice, frameSlice } from "../../store/utils";
import { GROUP_SELECTION_RECT_PADDING } from "./constants";
import { SelectionRect } from "./SelectionRect";
import { ShapeOutline } from "./ShapeOutline";
import { FrameOutline } from "./FrameOutline";

export const SelectionOutlineLayer = () => {
    // Shapes
    const selectedShapeIds = useSelectedShapeIds();
    const selectedShapesBounds = useSelectedShapesBounds();
    const { shapes } = shapeSlice.getSlice();

    // Frames
    const selectedFrameIds = useSelectedFrameIds();
    const selectedFramesBounds = useSelectedFramesBounds();
    const { frames } = frameSlice.getSlice();

    useRenderLogger("SelectionOutlineLayer");

    const multipleSelectedShapes = selectedShapeIds.size > 1;
    const multipleSelectedFrames = selectedFrameIds.size > 1;

    const renderShapeOutlines = () =>
        Array.from(selectedShapeIds).map((id) => {
            const shape = shapes[id];
            if (!shape) return null;
            return (
                <g key={id}>
                    <ShapeOutline
                        shape={shape}
                        multipleSelected={multipleSelectedShapes}
                    />
                </g>
            );
        });

    const renderFrameOutlines = () =>
        Array.from(selectedFrameIds).map((id) => {
            const frame = frames[id];
            if (!frame) return null;
            return (
                <g key={id}>
                    <FrameOutline
                        frame={frame}
                        multipleSelected={multipleSelectedFrames}
                    />
                </g>
            );
        });

    const renderGroupOutline = () => {
        // For shapes
        const shapeGroup =
            multipleSelectedShapes && selectedShapesBounds ? (
                <SelectionRect
                    bounds={selectedShapesBounds}
                    padding={GROUP_SELECTION_RECT_PADDING}
                    dashed
                    showHandles
                />
            ) : null;

        // For frames
        const frameGroup =
            multipleSelectedFrames && selectedFramesBounds ? (
                <SelectionRect
                    bounds={selectedFramesBounds}
                    padding={GROUP_SELECTION_RECT_PADDING}
                    dashed
                    showHandles
                />
            ) : null;

        return (
            <>
                {shapeGroup}
                {frameGroup}
            </>
        );
    };

    return (
        <>
            {renderShapeOutlines()}
            {renderFrameOutlines()}
            {renderGroupOutline()}
        </>
    );
};
