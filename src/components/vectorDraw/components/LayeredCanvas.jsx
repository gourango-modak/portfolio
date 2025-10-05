import { useRenderLogger } from "../hooks/useRenderLogger";
import { useToolShortcuts } from "../hooks/useToolShortcuts";
import ContentLayer from "./ContentLayer";
import InteractionOverlay from "./InteractionOverlay";
import { useZoomPan } from "./../hooks/useZoomPan";
import { TextInputOverlay } from "./TextInputOverlay";

const LayeredCanvas = () => {
    useZoomPan();
    useToolShortcuts();

    useRenderLogger("LayeredCanvas");

    return (
        <>
            <ContentLayer />
            <InteractionOverlay />
            <TextInputOverlay />
        </>
    );
};

export default LayeredCanvas;
