import { HexColorPicker } from "react-colorful";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "./hooks/useClickOutside";
import { useToolbarStore } from "./store/useToolbarStore";
import { useRenderLogger } from "./debugging/useRenderLogger";

const defaultColorPicker = {
    isOpen: false,
    position: { x: 0, y: 0 },
};

export const ColorPicker = ({ triggerId }) => {
    const pickerRef = useRef(null);
    const colorPicker = useToolbarStore(
        (s) => s.colorPickers[triggerId] || defaultColorPicker
    );
    const setColorPickerColor = useToolbarStore((s) => s.setColorPickerColor);
    const closeColorPicker = useToolbarStore((s) => s.closeColorPicker);

    useEffect(() => {
        if (colorPicker.isOpen && colorPicker.position) {
            pickerRef.current.style.left = `${colorPicker.position.left}px`;
            pickerRef.current.style.top = `${colorPicker.position.top}px`;
        }
    }, [colorPicker.isOpen, colorPicker.position]);

    useClickOutside(pickerRef, () => {
        if (colorPicker.isOpen) closeColorPicker(triggerId);
    });

    useRenderLogger("ColorPicker");

    if (!colorPicker.isOpen) return null;

    return createPortal(
        <div ref={pickerRef} className="absolute z-100">
            <HexColorPicker
                color={colorPicker.color}
                onChange={(c) => setColorPickerColor(triggerId, c)}
            />
        </div>,
        document.body
    );
};
