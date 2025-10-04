import { PenTool } from "../tools/PenTool";
import { RectangleTool } from "../tools/RectangleTool";
import { PenShape } from "./PenShape";
import { RectShape } from "./RectShape";

export const shapeRegistry = {
    [PenTool.shapeType]: PenShape,
    [RectangleTool.shapeType]: RectShape,
};
