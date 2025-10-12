import { getRectFromPoints } from "../../../utils/geometryUtils";
import { getRectToPathData } from "../../../utils/svgUtils";

export const handleDragSelection = (tool, pointer) => {
    if (tool.clickedInsideSelection || tool.resizing || tool.moving) return;

    if (!tool.dragging) {
        tool.dragging = true;
        tool.createLiveElement();

        // Apply live rectangle styles
        tool.liveElement.setAttribute(
            "stroke",
            tool.properties.borderColor.value
        );
        tool.liveElement.setAttribute(
            "stroke-width",
            tool.properties.borderWidth.value
        );
        tool.liveElement.setAttribute("fill", tool.properties.fillColor.value);
    }

    const rect = getRectFromPoints(tool.startPoint, pointer);
    tool.liveElement.setAttribute("d", getRectToPathData(rect));
};
