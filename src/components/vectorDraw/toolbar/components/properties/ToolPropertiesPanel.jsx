import { useRenderLogger } from "../../../hooks/useRenderLogger";
import { useCanvasLastSelectedObjectId } from "../../../store/selectors/canvasObjectSelectors";
import { useActiveTool } from "../../../store/selectors/toolbarSelectors";
import { panelSlice } from "../../../store/utils";
import { ToolProperties } from "./ToolProperties";

export const ToolPropertiesPanel = () => {
    const activeTool = useActiveTool();
    const lastSelectedObjectId = useCanvasLastSelectedObjectId();
    const { closeToolPropertiesPanel } = panelSlice.getSlice();

    useRenderLogger("ToolPropertiesPanel");

    return (
        <div className="w-45 shadow-md bg-white rounded-md border border-gray-300 flex-col flex noselect">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 cursor-grab active:cursor-grabbing select-none drag-handle">
                <h2 className="text-sm font-medium text-gray-800 truncate">
                    Properties
                </h2>
                <button
                    className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full cursor-pointer close-btn"
                    onClick={closeToolPropertiesPanel}
                    aria-label="Close Properties Panel"
                >
                    ✕
                </button>
            </div>
            <ToolProperties
                activeTool={activeTool}
                canvasObjectId={lastSelectedObjectId}
            />
        </div>
    );
};
