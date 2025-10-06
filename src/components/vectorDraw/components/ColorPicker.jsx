import { HexColorPicker } from "react-colorful";
import { useRef, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import { colorPickerSlice } from "../store/storeUtils";
import { useRenderLogger } from "../hooks/useRenderLogger";

export const ColorPicker = memo(({ id }) => {
    const pickerRef = useRef(null);

    const isOpen = colorPickerSlice.useSliceProperty(
        (slice) => slice.colorPickers[id]?.isOpen
    );
    const color = colorPickerSlice.useSliceProperty(
        (slice) => slice.colorPickers[id]?.color
    );
    const position = colorPickerSlice.useSliceProperty(
        (slice) => slice.colorPickers[id]?.position
    );

    // Handle click outside to close picker
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                colorPickerSlice.getSlice().close(id);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, id]);

    // Update position of the picker
    useEffect(() => {
        if (isOpen && position && pickerRef.current) {
            pickerRef.current.style.left = `${position.x}px`;
            pickerRef.current.style.top = `${position.y}px`;
        }
    }, [isOpen, position]);

    useRenderLogger("ColorPicker");

    function handleChange(color) {
        colorPickerSlice.getSlice().setColor(id, color);
    }

    if (!isOpen) return null;

    return createPortal(
        <div ref={pickerRef} className="absolute z-100">
            <HexColorPicker color={color} onChange={handleChange} />
        </div>,
        document.body
    );
});
