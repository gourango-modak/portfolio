import { ColorPicker } from "./ColorPicker";
import { useRenderLogger } from "./debugging/useRenderLogger";
import SvgCanvas from "./SvgCanvas";
import Toolbar from "./toolbar/Toolbar";

export const DrawingEnvironment = () => {
    useRenderLogger("DrawingEnvironment");
    return (
        <>
            <Toolbar />
            <SvgCanvas />
            <ColorPicker />
        </>
    );
};
