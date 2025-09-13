import { EventHandlers } from "./EventHandlers";

export const useCanvasEvents = (
    svgRef,
    selectedTool,
    toolRegistry,
    context
) => {
    const { canvasSettings } = context;
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
            shiftKey: e.shiftKey,
        };
    };

    const transformedMouseEvent = (event) => {
        const { scale, pan } = canvasSettings;
        return {
            ...event,
            x: (event.x - pan.x) / scale,
            y: (event.y - pan.y) / scale,
            lx: event.x,
            ly: event.y,
        };
    };

    const getTransformedMouseEvent = (e) => {
        return transformedMouseEvent(getMouseEvent(e));
    };

    const processEvent = (event) => {
        if (!event) return;
        const handler = EventHandlers[event.type];
        if (handler) handler(event, context);
    };

    const handlers = {
        onPointerDown: (e) =>
            processEvent(
                toolRegistry[selectedTool]?.onPointerDown(
                    getTransformedMouseEvent(e),
                    context
                )
            ),
        onPointerMove: (e) =>
            processEvent(
                toolRegistry[selectedTool]?.onPointerMove(
                    getTransformedMouseEvent(e),
                    context
                )
            ),
        onPointerUp: () =>
            processEvent(toolRegistry[selectedTool]?.onPointerUp(), context),
    };

    return { ...handlers, getTransformedMouseEvent, processEvent };
};
