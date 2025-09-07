import { useToolbar } from "../../context/ToolbarContext";

export const ToolButton = ({ tool, icon }) => {
    const { setTool, selectedTool } = useToolbar();
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                setTool(tool);
            }}
            style={{
                background: selectedTool === tool ? "#000" : "#f9f9f9",
                color: selectedTool === tool ? "#fff" : "#333",
                border: "none",
                borderRadius: "8px",
                padding: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            title={tool}
        >
            {icon || tool}
        </button>
    );
};
