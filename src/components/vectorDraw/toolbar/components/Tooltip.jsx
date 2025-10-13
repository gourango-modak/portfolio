export const Tooltip = ({ text, orientation = "top" }) => {
    const positionClasses = {
        top: "-top-8 left-1/2 -translate-x-1/2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
        left: "right-full top-1/2 -translate-y-1/2 mr-1",
        right: "left-full top-1/2 -translate-y-1/2 ml-1",
    };

    const caretStyles = {
        top: {
            className: "absolute left-1/2 -bottom-1 transform -translate-x-1/2",
            style: {
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop: "4px solid #1f2937",
            },
        },
        bottom: {
            className: "absolute left-1/2 -top-1 transform -translate-x-1/2",
            style: {
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderBottom: "4px solid #1f2937",
            },
        },
        left: {
            className: "absolute -right-1 top-1/2 transform -translate-y-1/2",
            style: {
                borderTop: "4px solid transparent",
                borderBottom: "4px solid transparent",
                borderLeft: "4px solid #1f2937",
            },
        },
        right: {
            className: "absolute -left-1 top-1/2 transform -translate-y-1/2",
            style: {
                borderTop: "4px solid transparent",
                borderBottom: "4px solid transparent",
                borderRight: "4px solid #1f2937",
            },
        },
    };

    return (
        <div
            className={`z-10 absolute ${positionClasses[orientation]} opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none`}
        >
            <div className="relative bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-md">
                {text}
                <div
                    className={caretStyles[orientation].className}
                    style={caretStyles[orientation].style}
                />
            </div>
        </div>
    );
};
