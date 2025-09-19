import { useRenderLogger } from "../debugging/useRenderLogger";
import { useToolbarStore } from "../store/useToolbarStore";

export const ToolButton = ({
    item,
    isSelected: isSelectedProp = null,
    onClick,
}) => {
    const { name, Icon } = item;
    const isActiveTool = useToolbarStore((s) => s.activeTool === name);
    const isSelected = isSelectedProp ?? isActiveTool;

    const handleToolBtnClick = () => {
        onClick(item.name);
    };

    useRenderLogger("ToolButton");

    return (
        <button
            title={name}
            onClick={handleToolBtnClick}
            className={`p-2 rounded-md transition-colors duration-200 ${
                isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
};
