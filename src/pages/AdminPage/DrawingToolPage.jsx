import { ToolbarProvider } from "../../components/svgEditor/context/ToolbarContext";
import SVGDraw from "../../components/svgEditor/SVGDraw";

const DrawingToolPage = () => {
    return (
        <ToolbarProvider>
            <SVGDraw />
        </ToolbarProvider>
    );
};

export default DrawingToolPage;
