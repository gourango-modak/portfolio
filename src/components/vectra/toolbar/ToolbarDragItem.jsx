export const ToolbarDragItem = ({
    onMouseDown,
    dragging,
    orientation = "vertical",
}) => {
    const dotSize = 4; // px
    const gap = 4; // px spacing between dots

    // Layout based on orientation
    const rows = orientation === "vertical" ? 2 : 2;
    const cols = orientation === "vertical" ? 2 : 2;

    return (
        <div
            onMouseDown={onMouseDown}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "32px",
                width: "32px",
                cursor: dragging ? "grabbing" : "move",
                padding: 4,
            }}
        >
            {[...Array(rows)].map((_, rowIdx) => (
                <div
                    key={rowIdx}
                    style={{
                        display: "flex",
                        gap: gap,
                        marginBottom: rowIdx < rows - 1 ? gap : 0,
                    }}
                >
                    {[...Array(cols)].map((_, colIdx) => (
                        <div
                            key={colIdx}
                            style={{
                                width: dotSize,
                                height: dotSize,
                                backgroundColor: "#555",
                                borderRadius: "50%",
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
