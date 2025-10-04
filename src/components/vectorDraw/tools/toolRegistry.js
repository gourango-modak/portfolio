import { PanTool } from "./PanTool";
import { PenTool } from "./PenTool";
import { RectangleTool } from "./RectangleTool";
import { SelectionTool } from "./SelectionTool";

export const toolRegistry = {
    [PenTool.name]: PenTool,
    [RectangleTool.name]: RectangleTool,
    [PanTool.name]: PanTool,
    [SelectionTool.name]: SelectionTool,
};
