import { BaseTool } from "./BaseTool";
import { shapeSlice, textOverlaySlice } from "../store/utils";
import { TOOLS } from "./constants";
import { SHAPES } from "../shapes/constants";
import { testTextHit } from "../shapes/shapeHitTesting/testTextHit";

export class TextTool extends BaseTool {
    static name = TOOLS.TEXT;
    static label = "Text Tool";
    static shortcut = { code: "KeyI" };
    static defaultProperties = {
        color: { value: "#000", label: "Color", type: "color" },
        fontSize: {
            value: 32,
            label: "Font Size",
            type: "slider",
            min: 24,
            max: 100,
            step: 1,
        },
        fontFamily: { value: "Caveat", label: "Font Family", type: "text" },
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);
        this.startPoint = null;
    }

    onPointerDown(e) {
        const { isOpen, close, open } = textOverlaySlice.getSlice();
        const { shapeOrder, shapes, updateShape } = shapeSlice.getSlice();

        const clickX = e.tx;
        const clickY = e.ty;

        // Commit/update current overlay automatically
        if (isOpen) {
            close();
        }

        // Hit-test existing text shapes
        const textShapes = shapeOrder
            .map((id) => shapes[id])
            .filter((s) => s && s.type === SHAPES.TEXT);

        const hitShape = textShapes.find((s) => testTextHit(s, clickX, clickY));

        if (hitShape) {
            // Mark shape as editing
            updateShape(hitShape.id, { isEditing: true });

            open({
                position: { x: hitShape.x, y: hitShape.y },
                properties: hitShape.properties,
                text: hitShape.text,
                shapeId: hitShape.id,
                isNew: false,
            });
            return;
        }

        // Open new overlay
        open({
            position: { x: clickX, y: clickY },
            startPoint: { x: clickX, y: clickY },
            properties: this.properties,
        });
    }
}
