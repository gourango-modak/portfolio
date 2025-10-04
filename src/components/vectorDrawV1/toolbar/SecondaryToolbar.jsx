import { memo } from "react";
import { ToolButton } from "./ToolButton";
import { ORIENTATION } from "../../../utils/common";
import { useRenderLogger } from "../debugging/useRenderLogger";

export const SecondaryToolbar = memo(
    ({ tools, activeTool, onSubtoolClick, orientation }) => {
        const secondaryToolbarClass =
            orientation === ORIENTATION.HORIZONTAL
                ? "absolute left-1/2 bottom-full flex flex-row gap-2 translate-x-[-50%] -translate-y-4"
                : "absolute top-1/2 left-full flex flex-col gap-2 translate-y-[-50%] translate-x-4";
        useRenderLogger("Secondary Toolbar");
        return (
            <div
                className={`absolute bg-white border border-gray-300 rounded-xl shadow-md p-2 cursor-default flex gap-2 ${secondaryToolbarClass}`}
            >
                {tools.map((subItem) => (
                    <ToolButton
                        key={subItem.name}
                        item={subItem}
                        isSelected={activeTool === subItem.name}
                        onClick={onSubtoolClick}
                    />
                ))}
            </div>
        );
    }
);
