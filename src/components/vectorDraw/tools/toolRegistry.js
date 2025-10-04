import { PenTool } from "./PenTool";
import { RectangleTool } from "./RectangleTool";

export const toolRegistry = {
    [PenTool.name]: PenTool,
    [RectangleTool.name]: RectangleTool,
};
