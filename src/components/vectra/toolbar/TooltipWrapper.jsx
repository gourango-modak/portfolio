import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ORIENTATION } from "./../../../utils/common";

export const TooltipWrapper = ({
    tooltip,
    orientation = ORIENTATION.VERTICAL,
    children,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const ref = useRef(null);

    const getTooltipStyle = () => {
        if (!ref.current) return {};
        const rect = ref.current.getBoundingClientRect();

        return orientation === ORIENTATION.VERTICAL
            ? {
                  top: rect.top + rect.height / 2,
                  left: rect.right + 8,
                  transform: "translateY(-50%)",
              }
            : {
                  top: rect.bottom + 8,
                  left: rect.left + rect.width / 2,
                  transform: "translateX(-50%)",
              };
    };

    return (
        <div
            ref={ref}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative"
        >
            {children}

            {showTooltip &&
                tooltip &&
                createPortal(
                    <div
                        style={{
                            position: "fixed",
                            ...getTooltipStyle(),
                        }}
                        className="bg-black text-white text-xs px-2 py-1 rounded-md shadow-md
                                   whitespace-nowrap z-[9999] pointer-events-none"
                    >
                        {tooltip}
                    </div>,
                    document.body
                )}
        </div>
    );
};
