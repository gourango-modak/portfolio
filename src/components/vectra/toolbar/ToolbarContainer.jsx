export const ToolbarContainer = (
    { children, visible, position, isVertical },
    ref
) => {
    debugger;
    return (
        <div
            ref={ref}
            style={{
                position: "fixed",
                top: position.y,
                left: position.x,
                zIndex: 1000,
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: isVertical ? "column" : "row",
                alignItems: "center",
                padding: "4px",
                gap: "8px",
                userSelect: "none",
                opacity: visible ? 1 : 0,
            }}
        >
            {children}
        </div>
    );
};
