export const TextShape = ({ shape }) => {
    const {
        x,
        y,
        text,
        properties: { color, fontSize, fontFamily },
        isEditing, // flag to hide shape during editing
    } = shape;

    // If shape is being edited, skip rendering
    if (isEditing) return null;

    return (
        <foreignObject
            x={x}
            y={y}
            width={shape.width}
            height={shape.height}
            style={{ overflow: "visible" }}
        >
            <div
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                    color: color.value,
                    fontSize: `${fontSize.value}px`,
                    fontFamily: `${fontFamily.value}`,
                    lineHeight: 1.3,
                    padding: "0",
                    boxSizing: "border-box",
                    width: "100%",
                    height: "100%",
                    userSelect: "none",
                    whiteSpace: "pre-wrap",
                    letterSpacing: "0.1px",
                }}
            >
                {text}
            </div>
        </foreignObject>
    );
};
