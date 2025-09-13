import { useMemo } from "react";
import { ToolbarItem } from "./ToolbarItem";
import { useDrawingStore } from "../store/DrawingStoreContext";

export const useToolbarItems = () => {
    const {
        toolRegistry,
        setSelectedTool,
        serialize,
        deserialize,
        nextPage,
        prevPage,
    } = useDrawingStore();

    const handleSave = () => {
        const jsonString = serialize();

        // Trigger download
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "drawing.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleLoad = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonString = e.target.result;
                deserialize(jsonString);
            } catch (err) {
                console.error("Failed to load drawing", err);
            }
        };
        reader.readAsText(file);
    };

    return useMemo(() => {
        const items = [];

        // Drag handle
        items.push(
            new ToolbarItem({
                key: "drag",
                type: "drag",
                icon: (
                    <div
                        style={{
                            width: "16px",
                            height: "16px",
                            background: "red",
                        }}
                    />
                ),
                tooltip: "Move toolbar",
                draggable: true,
            })
        );

        // Group: Drawing tools
        Object.entries(toolRegistry).forEach(([toolName, instance]) => {
            if (instance.show()) {
                items.push(
                    new ToolbarItem({
                        key: toolName,
                        type: "tool",
                        icon: instance.getIcon(),
                        tooltip: toolName,
                        toolName,
                        group: "drawing",
                        onClick: () => setSelectedTool(toolName),
                    })
                );
            }
        });

        // Group: Actions
        items.push(
            new ToolbarItem({
                key: "save",
                type: "action",
                icon: <div>💾</div>,
                tooltip: "Save Image",
                onClick: handleSave,
                group: "actions",
            })
        );

        // Load action (uses hidden input)
        items.push(
            new ToolbarItem({
                key: "load",
                type: "action",
                icon: <div>📂</div>,
                tooltip: "Load Drawing",
                onClick: () => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = ".json";
                    input.onchange = handleLoad;
                    input.click();
                },
                group: "actions",
            })
        );

        items.push(
            new ToolbarItem({
                key: "next",
                type: "action",
                icon: <div>▶️</div>,
                tooltip: "Load Drawing",
                onClick: () => {
                    nextPage();
                },
                group: "actions",
            })
        );

        items.push(
            new ToolbarItem({
                key: "back",
                type: "action",
                icon: <div>◀️</div>,
                tooltip: "Load Drawing",
                onClick: () => {
                    prevPage();
                },
                group: "actions",
            })
        );

        return items;
    }, [toolRegistry, serialize]);
};
