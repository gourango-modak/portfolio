import { useRenderLogger } from "../../hooks/useRenderLogger";
import {
    useSelectedShapeIds,
    useSelectedShapesBounds,
} from "../../store/selectors/shapeSelectors";
import { shapeSlice } from "../../store/utils";
import { GROUP_SELECTION_RECT_PADDING } from "./constants";
import { SelectionRect } from "./SelectionRect";
import { ShapeOutline } from "./ShapeOutline";

export const SelectionOutlineLayer = () => {
    const selectedShapeIds = useSelectedShapeIds();
    const selectedShapesBounds = useSelectedShapesBounds();
    const { shapes } = shapeSlice.getSlice();

    useRenderLogger("SelectionOutlineLayer");

    if (!selectedShapeIds?.size) return null;

    const multipleSelected = selectedShapeIds.size > 1;

    const renderIndividualOutlines = () =>
        Array.from(selectedShapeIds).map((id) => {
            const shape = shapes[id];
            if (!shape) return null;
            return (
                <g key={id}>
                    <ShapeOutline
                        shape={shape}
                        multipleSelected={multipleSelected}
                    />
                </g>
            );
        });

    const renderGroupOutline = () =>
        multipleSelected && selectedShapesBounds ? (
            <SelectionRect
                bounds={selectedShapesBounds}
                padding={GROUP_SELECTION_RECT_PADDING}
                dashed
                showHandles
            />
        ) : null;

    return (
        <>
            {renderIndividualOutlines()}
            {renderGroupOutline()}
        </>
    );
};
