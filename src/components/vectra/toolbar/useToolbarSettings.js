import { useState, useEffect } from "react";

export const useToolbarSettings = (store, selectedTool, actions) => {
    const [settingsTool, setSettingsTool] = useState(null);

    // --- Color Picker State ---
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [colorPickerValue, setColorPickerValue] = useState("#ff0000");
    const [colorPickerTargetKey, setColorPickerTargetKey] = useState(null);
    const [colorPickerTitle, setColorPickerTitle] = useState("");

    useEffect(() => {
        if (!settingsTool) return;
        const selTool = store.toolRegistry[selectedTool];
        if (selTool && selTool.name !== settingsTool.name) {
            setSettingsTool(selTool);
        }
        // Close color picker when tool changes
        setColorPickerOpen(false);
    }, [selectedTool, settingsTool, store.toolRegistry]);

    const openSettingsMenu = (tool) => setSettingsTool(tool);
    const closeSettingsMenu = () => setSettingsTool(null);

    const handleSettingChange = (name, value) => {
        if (!settingsTool) return;
        store.updateToolSetting(settingsTool.name, name, value);
        settingsTool.updateSettings({ [name]: value });
    };

    const openColorPicker = (targetKey, initialValue, title) => {
        setColorPickerTargetKey(targetKey);
        setColorPickerValue(initialValue);
        setColorPickerTitle(title || "Color");
        setColorPickerOpen(true);
    };

    const closeColorPicker = () => setColorPickerOpen(false);

    const handleColorPickerChange = (value) => {
        setColorPickerValue(value);

        if (!colorPickerTargetKey) return;

        // Update canvas or tool setting depending on targetKey
        if (colorPickerTargetKey === "infiniteBg") {
            store.setCanvasSettings((prev) => ({ ...prev, infiniteBg: value }));
        } else if (settingsTool && colorPickerTargetKey === "color") {
            store.updateToolSetting(
                settingsTool.name,
                colorPickerTargetKey,
                value
            );
            settingsTool.updateSettings({ [colorPickerTargetKey]: value });
        }
    };

    const handleToolSelect = (tool) => {
        actions[tool.action]?.(tool);
        setSettingsTool(null);
    };

    const handleToolRightClick = (tool, event) => {
        event.preventDefault();
        if (tool.name === selectedTool) {
            const selTool = store.toolRegistry[tool.name];
            if (selTool) setSettingsTool(selTool);
            setColorPickerOpen(false);
        }
    };

    return {
        settingsTool,
        openSettingsMenu,
        closeSettingsMenu,
        handleSettingChange,
        handleToolSelect,
        handleToolRightClick,
        // Color Picker API
        colorPicker: {
            isOpen: colorPickerOpen,
            value: colorPickerValue,
            targetKey: colorPickerTargetKey,
            title: colorPickerTitle,
            open: openColorPicker,
            close: closeColorPicker,
            onChange: handleColorPickerChange,
        },
    };
};
