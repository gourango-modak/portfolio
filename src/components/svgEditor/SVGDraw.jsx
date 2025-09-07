import { useEffect, useRef, useState } from "react";
import { useSvgCoords } from "./hooks/useSvgCoords";
import { SVGCanvas } from "./SVGCanvas";
import { saveAsImage } from "./svgEditorUtils";
import { TOOL_HANDLERS } from "./toolHandlers/toolHandlers";
import { Toolbar } from "./toolbar/Toolbar";
import { useToolbar } from "./context/ToolbarContext";
import { TextInputOverlay } from "./TextInputOverlay";
import { useTextEdit } from "./hooks/useTextEdit";

export default function SVGDraw() {
    const { selectedTool: tool, eraserSize } = useToolbar();
    const [points, setPoints] = useState([]);
    const [shapes, setShapes] = useState([]);
    const [currentShape, setCurrentShape] = useState(null);
    const svgRef = useRef(null);
    const getSvgCoords = useSvgCoords(svgRef);
    const { editingText, setEditingText, inputRef, startText, submitText } =
        useTextEdit(shapes, setShapes);

    const state = { points, shapes, currentShape, eraserSize };
    const setState = {
        setPoints,
        setShapes,
        setCurrentShape,
        startText,
    };

    const handlePointerDown = (e) => {
        const coords = getSvgCoords(e);
        TOOL_HANDLERS[tool]?.onPointerDown?.(state, setState, coords, e);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        const coords = getSvgCoords(e);
        TOOL_HANDLERS[tool]?.onPointerMove?.(state, setState, coords, e);
    };

    const handlePointerUp = () => {
        TOOL_HANDLERS[tool]?.onPointerUp?.(state, setState);
    };

    // useEffect(() => {
    //     console.log("Shapes state changed:", shapes);
    // }, [state]);

    return (
        <div>
            <Toolbar saveAsImage={() => saveAsImage(svgRef)} />
            <SVGCanvas
                svgRef={svgRef}
                shapes={shapes}
                points={points}
                currentShape={currentShape}
                handlePointerDown={handlePointerDown}
                handlePointerMove={handlePointerMove}
                handlePointerUp={handlePointerUp}
            />
            <TextInputOverlay
                editingText={editingText}
                setEditingText={setEditingText}
                inputRef={inputRef}
                submitText={submitText}
            />
        </div>
    );
}
