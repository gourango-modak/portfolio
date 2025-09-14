import { useState } from "react";
import { TOOLS } from "./../tools/toolUtils";

export const useToolManager = () => {
    const [selectedTool, setSelectedTool] = useState(TOOLS.PEN.NAME);
    const [toolsSettings, setToolsSettings] = useState({ pen: {} });
    const [toolRegistry, setToolRegistry] = useState({});

    const updateToolSetting = (tool, key, value) => {
        setToolsSettings((prev) => ({
            ...prev,
            [tool]: { ...prev[tool], [key]: value },
        }));
    };

    const registerTool = (toolName, instance) => {
        setToolRegistry((prev) => ({ ...prev, [toolName]: instance }));
    };

    return {
        selectedTool,
        setSelectedTool,
        toolsSettings,
        setToolsSettings,
        updateToolSetting,
        toolRegistry,
        registerTool,
        selectedToolSettings: toolsSettings[selectedTool],
    };
};
