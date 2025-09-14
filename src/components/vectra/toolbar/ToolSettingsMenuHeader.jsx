export const ToolSettingsMenuHeader = ({ title, onClose, onMouseDown }) => (
    <div
        onMouseDown={onMouseDown}
        style={{
            cursor: "move",
            background: "#f7f7f7",
            padding: "8px 12px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
        }}
    >
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#333" }}>
            {title}
        </span>
        <button
            onClick={onClose}
            style={{
                border: "none",
                background: "transparent",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#777",
            }}
        >
            ×
        </button>
    </div>
);
