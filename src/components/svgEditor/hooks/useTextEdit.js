import { useState, useEffect, useRef } from "react";
import { generateId } from "../../../utils/common";

export const useTextEdit = (shapes, setShapes) => {
    const [editingText, setEditingText] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (editingText && inputRef.current) {
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.setSelectionRange(
                        inputRef.current.value.length,
                        inputRef.current.value.length
                    );
                }
            }, 0);
        }
    }, [editingText]);

    const startText = (x, y) => {
        setEditingText({
            id: generateId(),
            type: "text",
            x,
            y,
            value: "",
            fontSize: 16,
        });
    };

    const submitText = () => {
        if (editingText && editingText.value.trim() !== "") {
            const exists = shapes.some((s) => s.id === editingText.id);
            setShapes(
                exists
                    ? shapes.map((s) =>
                          s.id === editingText.id ? editingText : s
                      )
                    : [...shapes, editingText]
            );
        }
        setEditingText(null);
    };

    return { editingText, setEditingText, inputRef, startText, submitText };
};
