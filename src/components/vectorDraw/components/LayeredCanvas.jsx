import { useRenderLogger } from "../hooks/useRenderLogger";
import { useToolShortcuts } from "../hooks/useToolShortcuts";
import ContentLayer from "./ContentLayer";
import InteractionOverlay from "./InteractionOverlay";
import { useZoomPan } from "./../hooks/useZoomPan";

const LayeredCanvas = () => {
    useZoomPan();
    useToolShortcuts();

    useRenderLogger("LayeredCanvas");

    return (
        <>
            <ContentLayer />
            <InteractionOverlay />
        </>
    );
};

export default LayeredCanvas;
