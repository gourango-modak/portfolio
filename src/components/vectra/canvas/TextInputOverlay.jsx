import { useEffect, useRef, useState } from "react";

export const TextInputOverlay = ({
    currentShape,
    selectedTool,
    toolRegistry,
    processEvent,
}) => {
    const inputRef = useRef(null);
    const [text, setText] = useState(currentShape?.text || "");

    useEffect(() => {
        if (!currentShape) return;
        setText(currentShape.text || "");
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(
                    inputRef.current.value.length,
                    inputRef.current.value.length
                );
            }
        }, 0);
    }, [currentShape]);

    if (!currentShape) return;

    const finalizeText = () => {
        processEvent(toolRegistry[selectedTool].finalizeText(text));
        setText("");
    };

    const handleChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        toolRegistry[selectedTool].setText(newText);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            finalizeText();
        }
    };

    const handleBlur = () => {
        finalizeText();
    };

    return (
        <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur} // Save when clicking outside
            style={{
                position: "absolute",
                top: `${
                    currentShape.position.ly -
                    currentShape.settings.fontSize -
                    1
                }px`,
                left: currentShape.position.lx,
                fontSize: currentShape.settings.fontSize,
                fontFamily: currentShape.settings.fontFamily,
                color: currentShape.settings.color,
                border: "1px solid black",
                outline: "none",
                padding: "0px",
                background: "white",
                zIndex: 1000,
                backgroundColor: "transparent",
            }}
        />
    );
};
