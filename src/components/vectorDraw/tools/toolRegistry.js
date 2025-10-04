import { PanTool } from "./PanTool";
import { PenTool } from "./PenTool";
import { RectangleTool } from "./RectangleTool";
import { SelectionTool } from "./SelectionTool";
import { TOOLS } from "./toolsUtils";

export const toolRegistry = {
    [TOOLS.PEN]: PenTool,
    [TOOLS.RECTANGLE]: RectangleTool,
    [TOOLS.PAN]: PanTool,
    [TOOLS.SELECTION]: SelectionTool,
};
