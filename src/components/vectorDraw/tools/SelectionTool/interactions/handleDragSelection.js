import { getRectFromPoints } from "../../../utils/geometryUtils";
import { getRectToPathData } from "../../../utils/svgUtils";

export const handleDragSelection = (tool, pointer) => {
    if (tool.clickedInsideSelection || tool.resizing || tool.moving) return;

    if (!tool.dragging) {
        tool.dragging = true;
        tool.createLivePath();

        // Apply live rectangle styles
        tool.livePath.setAttribute("stroke", tool.properties.borderColor.value);
        tool.livePath.setAttribute(
            "stroke-width",
            tool.properties.borderWidth.value
        );
        tool.livePath.setAttribute("fill", tool.properties.fillColor.value);
    }

    const rect = getRectFromPoints(tool.startPoint, pointer);
    tool.livePath.setAttribute("d", getRectToPathData(rect));
};
