import { toolEventHandlers } from "./../tools/ToolEventHandlers";

export const useCanvasEvents = (
    svgRef,
    selectedTool,
    toolRegistry,
    context
) => {
    const getMouseEvent = (e) => {
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const coords = pt.matrixTransform(svg.getScreenCTM().inverse());
        return {
            x: coords.x,
            y: coords.y,
            buttons: e.buttons,
            pressure: e.pressure,
            deltaY: e.deltaY,
        };
    };

    const getTransformedMouseEvent = (e, canvasSettings) => {
        const { scale, pan } = canvasSettings;
        const event = getMouseEvent(e);
        return {
            ...event,
            x: (event.x - pan.x) / scale,
            y: (event.y - pan.y) / scale,
            lx: event.x,
            ly: event.y,
        };
    };

    const processToolEvent = (toolEvent) => {
        if (!toolEvent) return;
        const handler = toolEventHandlers[toolEvent.type];
        if (handler) handler(toolEvent, context);
    };

    const handlers = {
        onPointerDown: (e, canvasSettings) =>
            processToolEvent(
                toolRegistry[selectedTool]?.onPointerDown(
                    getTransformedMouseEvent(e, canvasSettings),
                    context
                )
            ),
        onPointerMove: (e, canvasSettings) =>
            processToolEvent(
                toolRegistry[selectedTool]?.onPointerMove(
                    getTransformedMouseEvent(e, canvasSettings),
                    context
                )
            ),
        onPointerUp: () =>
            processToolEvent(
                toolRegistry[selectedTool]?.onPointerUp(),
                context
            ),
        onWheel: (e, canvasSettings) =>
            processToolEvent(
                toolRegistry[selectedTool]?.onWheel?.(
                    getTransformedMouseEvent(e, canvasSettings),
                    context
                )
            ),
    };

    return handlers;
};
