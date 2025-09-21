import { useRenderLogger } from "../debugging/useRenderLogger";
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
    const openToolPropertiesPanel = usePanelStore(
        (s) => s.openToolPropertiesPanel
    );
    const openInspectorPanel = usePanelStore((s) => s.openInspectorPanel);
    const canvasMode = useCanvasStore((s) => s.mode);
    const isSelected = isSelectedProp ?? isActiveTool;

    const handleToolBtnClick = () => {
        onClick(item);
    };

    const handleToolBtnDoubleClick = () => {
        if (item.isTool) {
            openToolPropertiesPanel();
        } else if (item.panelTarget) {
            openInspectorPanel(item.panelTarget);
        }
    };

    const shouldShow = item?.visible?.({ canvasMode }) ?? true;

    useRenderLogger("ToolButton");

    return (
        <button
            title={name}
            onClick={handleToolBtnClick}
            onDoubleClick={handleToolBtnDoubleClick}
            className={`p-2 w-12 h-12 items-center justify-center rounded-lg bg-gray-50 transition-all cursor-pointer border-2 ${
                isSelected
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-transparent hover:bg-gray-100"
            } ${shouldShow ? "flex" : "hidden"}`}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
};
