import { SAVE_ICON } from "../ToolIcons";

export const SaveButton = ({ saveAsImage }) => (
    <button
        onClick={(e) => {
            e.stopPropagation();
            saveAsImage();
        }}
        style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        title="Save (Ctrl+S)"
    >
        {SAVE_ICON}
    </button>
);
