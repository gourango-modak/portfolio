import { HexColorPicker } from "react-colorful";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useColorPickerStore } from "../store/useColorPickerStore";
import { useRenderLogger } from "../hooks/useRenderLogger";

const defaultColorPicker = {
    isOpen: false,
    position: { x: 0, y: 0 },
};

export const ColorPicker = ({ id }) => {
    const pickerRef = useRef(null);
    const colorPicker = useColorPickerStore(
        (s) => s.colorPickers[id] || defaultColorPicker
    );
    const setColor = useColorPickerStore((s) => s.setColor);
    const close = useColorPickerStore((s) => s.close);

    useEffect(() => {
        if (!colorPicker.isOpen) return;

        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                close(id);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [colorPicker.isOpen, close, id]);

    useEffect(() => {
        if (colorPicker.isOpen && colorPicker.position && pickerRef.current) {
            pickerRef.current.style.left = `${colorPicker.position.left}px`;
            pickerRef.current.style.top = `${colorPicker.position.top}px`;
        }
    }, [colorPicker.isOpen, colorPicker.position]);

    useRenderLogger("ColorPicker");

    if (!colorPicker.isOpen) return null;

    return createPortal(
        <div ref={pickerRef} className="absolute z-100">
            <HexColorPicker
                color={colorPicker.color}
                onChange={(c) => setColor(id, c)}
            />
        </div>,
        document.body
    );
};
