import { useToolbarStore } from "../../store/useToolbarStore";
import { useRenderLogger } from "../../debugging/useRenderLogger";
import { toolRegistry } from "../../tools/toolRegistry";
import { useDraggable } from "../../hooks/useDraggable";
import { ToolSettingsPanel } from "./ToolSettingsPanel";
import { CanvasSettingsPanel } from "./CanvasSettingsPanel";
import { useRef } from "react";
import { SETTINGS_PANEL_TARGETS } from "./settingsUtils";

const SettingsPanel = () => {
    const isVisible = useToolbarStore((s) => s.settingsPanel.isVisible);
    const activeTool = useToolbarStore((s) => s.activeTool);
    const onClose = useToolbarStore((s) => s.closeSettingsPanel);
    const setSettingsPanelPosition = useToolbarStore(
        (s) => s.setSettingsPanelPosition
    );
    const target = useToolbarStore((s) => s.settingsPanel.target);
    const tool = toolRegistry[activeTool];

    const panelRef = useRef(null);
    const dragHandleRef = useRef(null);
    const initialPosition = useToolbarStore.getState().settingsPanel.position;
    useDraggable({
        dragHandleRef: dragHandleRef,
        draggableRef: panelRef,
        initialPosition,
        onPositionChange: setSettingsPanelPosition,
    });

    useRenderLogger("SettingsPanel");

    let title = "";

    if (target === SETTINGS_PANEL_TARGETS.TOOL) {
        title = tool.label + " Settings";
    } else if (target === SETTINGS_PANEL_TARGETS.CANVAS) {
        title = "Canvas Settings";
    }

    return (
        <div
            ref={panelRef}
            className={`fixed select-none w-80 shadow-md bg-white rounded-md border border-gray-300 flex-col z-50 ${
                isVisible ? "flex" : "hidden"
            }`}
        >
            <div
                className="flex items-center justify-between px-3 py-2 border-b border-gray-100 cursor-grab active:cursor-grabbing select-none"
                ref={dragHandleRef}
            >
                <h2 className="text-sm font-medium text-gray-800 truncate">
                    {title}
                </h2>
                <button
                    className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full cursor-pointer"
                    onClick={onClose}
                    aria-label="Close Settings Panel"
                >
                    ✕
                </button>
            </div>
            {target === SETTINGS_PANEL_TARGETS.TOOL && (
                <ToolSettingsPanel activeTool={activeTool} />
            )}
            {target === SETTINGS_PANEL_TARGETS.CANVAS && (
                <CanvasSettingsPanel />
            )}
        </div>
    );
};

export default SettingsPanel;
