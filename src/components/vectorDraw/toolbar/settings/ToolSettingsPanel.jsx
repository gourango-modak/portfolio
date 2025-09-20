import { useRenderLogger } from "../../debugging/useRenderLogger";
import { useToolbarStore } from "../../store/useToolbarStore";
import { getMergedToolSettings } from "../../svgCanvasUtils";
import { toolRegistry } from "../../tools/toolRegistry";
import { TOOL_SETTINGS_COMPONENTS } from "./settingsUtils";

export const ToolSettingsPanel = ({ activeTool }) => {
    const userToolSettings = useToolbarStore(
        (s) => s.userToolSettings[activeTool]
    );
    const tool = toolRegistry[activeTool];
    const toolSettings = getMergedToolSettings(userToolSettings, activeTool);

    const handleSettingChange = (property, newValue) => {
        console.log(property, newValue);
    };

    useRenderLogger("ToolSettingsPanel");

    return (
        <div className="flex-1 px-5 py-4 flex flex-col gap-4 overflow-auto">
            {!activeTool && (
                <div className="text-gray-500 text-sm text-center py-8">
                    No tool selected
                </div>
            )}

            {tool && !toolSettings && (
                <div className="text-gray-500 text-sm text-center py-8">
                    <span className="font-medium">{tool.label}</span> has no
                    configurable settings.
                </div>
            )}

            {toolSettings && (
                <div className="flex flex-col gap-4">
                    {Object.entries(toolSettings).map(([property, setting]) => {
                        const Component = TOOL_SETTINGS_COMPONENTS[property];

                        return (
                            <div
                                key={setting.label}
                                className="flex flex-col gap-1"
                            >
                                <label className="text-gray-600 text-sm font-medium">
                                    {setting.label}
                                </label>
                                <Component
                                    property={property}
                                    value={setting.value}
                                    onChange={handleSettingChange}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
