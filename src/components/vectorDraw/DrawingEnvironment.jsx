import SvgCanvas from "./SvgCanvas";
import Toolbar from "./toolbar/Toolbar";

export const DrawingEnvironment = () => {
    return (
        <>
            <Toolbar />
            <SvgCanvas />
        </>
    );
};
