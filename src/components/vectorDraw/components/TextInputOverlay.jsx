import { useRef, useState, useLayoutEffect } from "react";
import { useTextInputOverlayStore } from "../store/useTextInputOverlayStore";
import { useCanvasStore } from "./../store/useCanvasStore";

export const TextInputOverlay = () => {
    const inputRef = useRef(null);
    const spanRef = useRef(null);
    const [text, setText] = useState("");

    const scaleFactor = useCanvasStore((s) => s.properties.scale);
    const pan = useCanvasStore((s) => s.properties.pan);
    const isOpen = useTextInputOverlayStore((s) => s.isOpen);
    const position = useTextInputOverlayStore((s) => s.position);
    const properties = useTextInputOverlayStore((s) => s.properties);
    const fontSize = properties?.fontSize?.value;
    const fontFamily = properties?.fontFamily?.value;
    const color = properties?.color?.value;

    const [inputWidth, setInputWidth] = useState(fontSize);

    // Update width whenever text changes
    useLayoutEffect(() => {
        if (spanRef.current) {
            const spanWidth =
                spanRef.current.offsetWidth + fontSize * scaleFactor;
            const maxWidth =
                window.innerWidth - (position.x * scaleFactor + pan.x);
            setInputWidth(Math.min(spanWidth, maxWidth));
        }
    }, [text, position.x, scaleFactor, pan.x]);

    useLayoutEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                if (inputRef.current) inputRef.current.focus();
            }, 0);
            setText(useTextInputOverlayStore.getState().text);
        }
    }, [position]);

    const handleChange = (e) => {
        setText(e.target.value);
        useTextInputOverlayStore.getState().setText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            useTextInputOverlayStore.getState().close();
        }
    };

    if (!isOpen) return null;

    const scaledFontSize = scaleFactor * fontSize;

    return (
        <>
            {/* Hidden span to measure text width */}
            <span
                ref={spanRef}
                style={{
                    position: "fixed",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontSize: scaledFontSize,
                    fontFamily: fontFamily,
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
                style={{
                    position: "absolute",
                    top: `${
                        position.y * scaleFactor + pan.y - scaledFontSize * 0.8
                    }px`,
                    left: `${position.x * scaleFactor + pan.x}px`,
                    fontSize: `${scaledFontSize}px`,
                    height: `${scaledFontSize}px`,
                    fontFamily: fontFamily,
                    margin: 0,
                    padding: 0,
                    border: 0,
                    outline: "none",
                    background: "transparent",
                    boxSizing: "content-box",
                    zIndex: 1000,
                    color: color,
                    width: `${inputWidth}px`,
                    letterSpacing: "0.0001px",
                }}
            />
        </>
    );
};
