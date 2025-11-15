import { useRenderLogger } from "../hooks/useRenderLogger";
import { useToolShortcuts } from "../shortcuts/useToolShortcuts";
import ContentLayer from "./ContentLayer";
import InteractionOverlay from "./InteractionOverlay";
import { useZoomPan } from "./../hooks/useZoomPan";
import { useViewportLayout } from "../hooks/useViewportLayout";

const LayeredCanvas = () => {
    useZoomPan();
    useToolShortcuts();
    useViewportLayout();

    useRenderLogger("LayeredCanvas");

    return (
        <>
            <ContentLayer />
            <InteractionOverlay />
        </>
    );
};

export default LayeredCanvas;
