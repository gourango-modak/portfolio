import { ArrowTool } from "./ArrowTool";
import { EraserTool } from "./EraserTool";
import { PanTool } from "./PanTool";
import { PenTool } from "./PenTool";
import { RectangleTool } from "./RectangleTool";
import { SelectionTool } from "./SelectionTool";
import { TextTool } from "./TextTool";
import { TOOLS } from "./toolsUtils";

export const toolRegistry = {
    [TOOLS.PEN]: PenTool,
    [TOOLS.RECTANGLE]: RectangleTool,
    [TOOLS.PAN]: PanTool,
    [TOOLS.SELECTION]: SelectionTool,
    [TOOLS.ARROW]: ArrowTool,
    [TOOLS.ERASER]: EraserTool,
    [TOOLS.TEXT]: TextTool,
};
