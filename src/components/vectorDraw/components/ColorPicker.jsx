import { HexColorPicker } from "react-colorful";
import { useRef, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import { colorPickerSlice } from "../store/utils";
import { useRenderLogger } from "../hooks/useRenderLogger";
import {
    useColorPickerColor,
    useColorPickerOpen,
    useColorPickerPosition,
} from "../store/selectors/colorPickerSelectors";
import { getSafeViewportPosition } from "../utils/canvasUtils";

export const ColorPicker = memo(({ id }) => {
    const pickerRef = useRef(null);

    const isOpen = useColorPickerOpen(id);
    const color = useColorPickerColor(id);
    const position = useColorPickerPosition(id);
    const { close, setColor } = colorPickerSlice.getSlice();

    // Handle click outside to close picker
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                close(id);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, id]);

    // Update position of the picker
    useEffect(() => {
        if (isOpen && position && pickerRef.current) {
            const picker = pickerRef.current;
            const rect = picker.getBoundingClientRect();

            const safePos = getSafeViewportPosition({
                x: position.x,
                y: position.y,
                width: rect.width,
                height: rect.height,
            });

            picker.style.left = `${safePos.x}px`;
            picker.style.top = `${safePos.y}px`;
        }
    }, [isOpen, position]);

    useRenderLogger("ColorPicker");

    function handleChange(color) {
        setColor(id, color);
    }

    if (!isOpen) return null;

    return createPortal(
        <div ref={pickerRef} className="absolute z-100">
            <HexColorPicker color={color} onChange={handleChange} />
        </div>,
        document.body
    );
});
