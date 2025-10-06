import { useRef, useState, useLayoutEffect } from "react";
import { textOverlaySlice } from "../store/storeUtils";
import {
    useCanvasScale,
    useCanvasPan,
} from "../store/selectors/canvasPropertiesSelectors";
import {
    useTextOverlayOpen,
    useTextOverlayPosition,
    useTextOverlayProperties,
} from "../store/selectors/textOverlaySelectors";

export const TextInputOverlay = () => {
    const inputRef = useRef(null);
    const spanRef = useRef(null);
    const [text, setText] = useState("");

    const scale = useCanvasScale();
    const pan = useCanvasPan();

    const isOpen = useTextOverlayOpen();
    const position = useTextOverlayPosition();
    const properties = useTextOverlayProperties();

    const fontSize = properties?.fontSize?.value;
    const fontFamily = properties?.fontFamily?.value;
    const color = properties?.color?.value;

    const [inputWidth, setInputWidth] = useState(fontSize);

    const { setText: setOverlayText, close: closeTextOverlay } =
        textOverlaySlice.getSlice();

    // Update width whenever text changes
    useLayoutEffect(() => {
        if (spanRef.current) {
            const spanWidth = spanRef.current.offsetWidth + fontSize * scale;
            const maxWidth = window.innerWidth - (position.x * scale + pan.x);
            setInputWidth(Math.min(spanWidth, maxWidth));
        }
    }, [text, position.x, scale, pan.x]);

    useLayoutEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                if (inputRef.current) inputRef.current.focus();
            }, 0);
            setText(textOverlaySlice.getSlice().text);
        }
    }, [position]);

    const handleChange = (e) => {
        setText(e.target.value);
        setOverlayText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            closeTextOverlay();
        }
    };

    if (!isOpen) return null;

    const scaledFontSize = scale * fontSize;

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
                        position.y * scale + pan.y - scaledFontSize * 0.8
                    }px`,
                    left: `${position.x * scale + pan.x}px`,
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
