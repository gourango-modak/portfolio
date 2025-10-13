import { toolActions } from "./toolActions";
import { pageActions } from "./pageActions";
import { canvasActions } from "./canvasActions";
import { importExportActions } from "./importActions";
import { exportActions } from "./exportActions";

export const toolActionHandlers = {
    ...toolActions,
    ...pageActions,
    ...canvasActions,
    ...importExportActions,
    ...exportActions,
};
