export const TextInputOverlay = ({
    editingText,
    setEditingText,
    inputRef,
    submitText,
}) => {
    if (!editingText) return null;

    return (
        <input
            ref={inputRef}
            value={editingText.value}
            onChange={(e) =>
                setEditingText({ ...editingText, value: e.target.value })
            }
            onBlur={submitText}
            onKeyDown={(e) => e.key === "Enter" && submitText()}
            style={{
                position: "absolute",
                left: `${editingText.x}px`,
                top: `${editingText.y - editingText.fontSize - 1}px`,
                fontSize: `${editingText.fontSize}px`,
                border: "0px",
                outline: "none",
                padding: "0px",
                zIndex: 1000,
                fontFamily: "Arial, sans-serif",
            }}
        />
    );
};
