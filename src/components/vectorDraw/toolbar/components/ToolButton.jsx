import { useRenderLogger } from "../../hooks/useRenderLogger";
import { useCanvasMode } from "../../store/selectors/canvasPropertiesSelectors";
import { useActiveFrameId } from "../../store/selectors/frameSelectors";
import { usePanelOrientation } from "../../store/selectors/panelSelectors";
import { panelSlice } from "../../store/utils";
import { Tooltip } from "./Tooltip";
import { useIsActiveTool } from "../../store/selectors/toolbarSelectors";
import { ORIENTATION } from "../../../../utils/common";
import { PANELS } from "../../constants";

export const ToolButton = ({
    item,
    isSelected: isSelectedProp = null,
    onClick,
}) => {
    const { name, Icon, tooltipText } = item;
    const isActiveTool = useIsActiveTool(name);
    const canvasMode = useCanvasMode();
    const activeFrameId = useActiveFrameId();

    const { openInspectorPanel } = panelSlice.getSlice();
    const orientation = usePanelOrientation(PANELS.TOOLBAR_PANEL);

    const isSelected = isSelectedProp ?? isActiveTool;

    const handleToolBtnClick = () => {
        onClick({ ...item });

        if (item.panelTarget) {
            openInspectorPanel(item.panelTarget);
        }
    };

    const shouldShow = item?.visible?.({ canvasMode }) ?? true;
    const shouldDisable = item?.disable?.({ activeFrameId }) ?? false;

    useRenderLogger("ToolButton");

    return (
        <div
            className={`relative items-center justify-center group ${
                shouldShow ? "flex" : "hidden"
            }`}
        >
            <button
                onClick={handleToolBtnClick}
                className={`p-2 w-12 h-12 flex items-center justify-center rounded-lg transition-all cursor-pointer border-2 ${
                    isSelected
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-transparent hover:bg-gray-100"
                }  ${
                    shouldDisable
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                        : "bg-gray-50"
                }`}
            >
                <Icon className="w-5 h-5" />
            </button>

            {tooltipText && (
                <Tooltip
                    text={tooltipText}
                    orientation={
                        orientation === ORIENTATION.VERTICAL ? "right" : "top"
                    }
                />
            )}
        </div>
    );
};
