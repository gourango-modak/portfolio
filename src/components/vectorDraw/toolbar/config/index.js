import { primaryTools } from "./../toolGroups/primaryTools";
import { otherTools } from "./../toolGroups/otherTools";
import { pageTools } from "../toolGroups/pageTools";
import { actionTools } from "../toolGroups/actionTools";

export const toolbarConfig = [
    ...primaryTools,
    otherTools,
    pageTools,
    actionTools,
];
