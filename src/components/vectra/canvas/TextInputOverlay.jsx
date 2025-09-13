import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const TextInputOverlay = ({
    currentShape,
    selectedTool,
    toolRegistry,
    processEvent,
}) => {
    const inputRef = useRef(null);
    const spanRef = useRef(null);
    const [text, setText] = useState(currentShape?.text || "");
    const [inputWidth, setInputWidth] = useState(0);

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

    useLayoutEffect(() => {
        setInputWidth(
            spanRef.current?.offsetWidth + currentShape?.settings?.fontSize || 1
        );
    }, [text]);

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
        <>
            {/* Hidden span to measure text width */}
            <span
                ref={spanRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    fontSize: currentShape.settings.fontSize,
                    fontFamily: currentShape.settings.fontFamily,
                    whiteSpace: "pre",
                }}
            >
                {text}
            </span>
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
                    border: "0px",
                    outline: "none",
                    padding: "0px",
                    background: "white",
                    zIndex: 1000,
                    backgroundColor: "transparent",
                    width: `${inputWidth}px`,
                }}
            />
        </>
    );
};
