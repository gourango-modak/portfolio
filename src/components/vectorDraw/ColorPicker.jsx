import { HexColorPicker } from "react-colorful";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "./hooks/useClickOutside";
import { useToolbarStore } from "./store/useToolbarStore";
import { useRenderLogger } from "./debugging/useRenderLogger";

export const ColorPicker = () => {
    const pickerRef = useRef(null);
    const colorPicker = useToolbarStore((s) => s.colorPicker);
    const closeColorPicker = useToolbarStore((s) => s.closeColorPicker);
    const setColorPickerColor = useToolbarStore((s) => s.setColorPickerColor);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useRenderLogger("ColorPicker");

    useEffect(() => {
        if (colorPicker.isOpen && colorPicker.anchorEl) {
            const rect = colorPicker.anchorEl.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
    }, [colorPicker.isOpen, colorPicker.anchorEl]);

    useClickOutside(pickerRef, () => {
        if (colorPicker.isOpen) closeColorPicker();
    });

    if (!colorPicker.isOpen) return null;

    return createPortal(
        <div
            ref={pickerRef}
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                zIndex: 9999,
            }}
        >
            <HexColorPicker
                color={colorPicker.color}
                onChange={setColorPickerColor}
            />
        </div>,
        document.body
    );
};
