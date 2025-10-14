import { Panel } from "./components/Panel";
import LayeredCanvas from "./components/LayeredCanvas";
import { PANELS } from "./constants";
import Toolbar from "./toolbar/components/Toolbar";
import { InspectorPanel } from "./toolbar/components/properties/InspectorPanel";
import { ToolPropertiesPanel } from "./toolbar/components/properties/ToolPropertiesPanel";
import { ExportPanel } from "./toolbar/components/ExportPanel";

export const DrawingEnvironment = () => {
    return (
        <>
            <Panel panelId={PANELS.TOOLBAR_PANEL}>
                <Toolbar />
            </Panel>
            <Panel panelId={PANELS.INSPECTOR_PANEL}>
                <InspectorPanel />
            </Panel>
            <Panel panelId={PANELS.TOOL_PROPERTIES_PANEL}>
                <ToolPropertiesPanel />
            </Panel>
            <Panel panelId={PANELS.EXPORT_PANEL}>
                <ExportPanel />
            </Panel>
            <LayeredCanvas />
        </>
    );
};
