import Toolbar from "./toolbar/Toolbar";
import { Panel } from "./components/Panel";
import InspectorPanel from "./toolbar/properties/InspectorPanel";
import ToolPropertiesPanel from "./toolbar/properties/ToolPropertiesPanel";
import LayeredCanvas from "./components/LayeredCanvas";
import { PANELS } from "./constants";

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
            <LayeredCanvas />
        </>
    );
};
