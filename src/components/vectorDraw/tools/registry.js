import { ArrowTool } from "./ArrowTool";
import { TOOLS } from "./constants";
import { EraserTool } from "./EraserTool";
import { FrameTool } from "./FrameTool";
import { LaserPointerTool } from "./LaserPointerTool";
import { PanTool } from "./PanTool";
import { PenTool } from "./PenTool";
import { RectangleTool } from "./RectangleTool";
import { SelectionTool } from "./SelectionTool";
import { TextTool } from "./TextTool";

export const toolRegistry = {
    [TOOLS.PEN]: PenTool,
    [TOOLS.RECTANGLE]: RectangleTool,
    [TOOLS.PAN]: PanTool,
    [TOOLS.SELECTION]: SelectionTool,
    [TOOLS.ARROW]: ArrowTool,
    [TOOLS.ERASER]: EraserTool,
    [TOOLS.TEXT]: TextTool,
    [TOOLS.LASER_POINTER]: LaserPointerTool,
    [TOOLS.FRAME]: FrameTool,
};
