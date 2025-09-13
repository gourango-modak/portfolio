import { useState } from "react";

export const ToolbarButton = ({
    icon,
    tooltip,
    onClick,
    type,
    options = [],
    selected = false,
    draggingProps,
}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (type === "dropdown") {
            setOpen((prev) => !prev);
        } else {
            onClick?.();
        }
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <div
                title={tooltip}
                onClick={handleClick}
                style={{
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    cursor: draggingProps ? "grab" : "pointer",
                    userSelect: "none",
                    background: selected ? "#e0f0ff" : "#fff",
                    border: selected ? "1px solid #007bff" : "1px solid #ddd",
                    boxShadow: selected
                        ? "0 2px 6px rgba(0,123,255,0.3)"
                        : "0 1px 3px rgba(0,0,0,0.1)",
                    transition: "all 0.2s",
                }}
                {...draggingProps}
            >
                {icon}
                {type === "dropdown" && (
                    <span style={{ marginLeft: "4px", fontSize: "10px" }}>
                        ▾
                    </span>
                )}
            </div>

            {/* Dropdown menu */}
            {type === "dropdown" && open && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        marginTop: "6px",
                        padding: "6px",
                        display: "flex",
                        gap: "6px",
                        zIndex: 1000,
                        whiteSpace: "nowrap",
                    }}
                >
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onClick?.(opt.value);
                                setOpen(false);
                            }}
                            title={opt.label} // show tooltip on hover
                            style={{
                                width: "36px",
                                height: "36px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                borderRadius: "6px",
                                transition: "all 0.15s",
                                background: "#f9f9f9",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.background = "#e6f7ff")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.background = "#f9f9f9")
                            }
                        >
                            {opt.icon || opt.label}{" "}
                            {/* Use icon if provided, fallback to label */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
