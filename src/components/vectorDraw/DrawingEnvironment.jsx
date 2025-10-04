import { PANELS } from "./canvasUtils";
import Toolbar from "./toolbar/Toolbar";
import { Panel } from "./components/Panel";
import InspectorPanel from "./toolbar/properties/InspectorPanel";
import ToolPropertiesPanel from "./toolbar/properties/ToolPropertiesPanel";
import Canvas from "./components/Canvas";

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
            <Canvas />
        </>
    );
};
