import { useRef } from "react";
import { useRenderLogger } from "./debugging/useRenderLogger";
import { PanelWrapper } from "./PanelWrapper";
import SvgCanvas from "./SvgCanvas";
import InspectorPanel from "./toolbar/properties/InspectorPanel";
import ToolPropertiesPanel from "./toolbar/properties/ToolPropertiesPanel";
import Toolbar from "./toolbar/Toolbar";
import { PANELS } from "./svgCanvasUtils";

export const DrawingEnvironment = () => {
    const toolbarPanelRef = useRef(null);
    const inspectorPanelRef = useRef(null);
    const toolPropertiesPanelRef = useRef(null);

    useRenderLogger("DrawingEnvironment");

    return (
        <>
            <PanelWrapper
                panelId={PANELS.TOOLBAR_PANEL}
                dragHandleRef={toolbarPanelRef}
            >
                <Toolbar />
            </PanelWrapper>
            <PanelWrapper
                panelId={PANELS.INSPECTOR_PANEL}
                dragHandleRef={inspectorPanelRef}
            >
                <InspectorPanel />
            </PanelWrapper>
            <PanelWrapper
                panelId={PANELS.TOOL_PROPERTIES_PANEL}
                dragHandleRef={toolPropertiesPanelRef}
            >
                <ToolPropertiesPanel />
            </PanelWrapper>
            <SvgCanvas />
        </>
    );
};
