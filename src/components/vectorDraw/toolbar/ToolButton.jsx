import { useRenderLogger } from "../hooks/useRenderLogger";
import { useCanvasStore } from "../store/useCanvasStore";
import { usePanelStore } from "../store/usePanelStore";
import { useToolbarStore } from "../store/useToolbarStore";

export const ToolButton = ({
    item,
    isSelected: isSelectedProp = null,
    onClick,
}) => {
    const { name, Icon } = item;
    const isActiveTool = useToolbarStore((s) => s.activeTool === name);
    const canvasMode = useCanvasStore((s) => s.properties.mode);
    const activeFrameId = useCanvasStore((s) => s.activeFrameId);
    const isSelected = isSelectedProp ?? isActiveTool;

    const handleToolBtnClick = () => {
        onClick(item);

        if (item.panelTarget) {
            usePanelStore.getState().openInspectorPanel(item.panelTarget);
        }
    };

    const shouldShow = item?.visible?.({ canvasMode }) ?? true;
    const shouldDisable = item?.disable?.({ activeFrameId }) ?? false;

    useRenderLogger("ToolButton");

    return (
        <button
            title={name}
            onClick={handleToolBtnClick}
            className={`p-2 w-12 h-12 items-center justify-center rounded-lg transition-all cursor-pointer border-2 ${
                isSelected
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-transparent hover:bg-gray-100"
            } ${shouldShow ? "flex" : "hidden"} ${
                shouldDisable
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                    : "bg-gray-50"
            }`}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
};
