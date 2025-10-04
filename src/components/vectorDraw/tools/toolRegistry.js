import { PanTool } from "./PanTool";
import { PenTool } from "./PenTool";
import { RectangleTool } from "./RectangleTool";

export const toolRegistry = {
    [PenTool.name]: PenTool,
    [RectangleTool.name]: RectangleTool,
    [PanTool.name]: PanTool,
};
