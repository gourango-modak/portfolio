import { lineTool } from "./lineTool";
import { arrowTool } from "./arrowTool";

export const toolRegistry = {
    [lineTool.name]: lineTool,
    [arrowTool.name]: arrowTool,
};
