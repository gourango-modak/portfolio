import { BaseTool } from "./BaseTool";
import { TOOLS } from "./toolsUtils";
import { useTextInputOverlayStore } from "./../store/useTextInputOverlayStore";
import { SHAPES } from "../shapes/shapesUtils";
import { useShapeStore } from "../store/useShapeStore";
import { hitTestTextShape } from "../shapes/shapeHitTestRegistry";

export class TextTool extends BaseTool {
    static name = TOOLS.TEXT;
    static label = "Text Tool";

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
        const overlayStore = useTextInputOverlayStore.getState();
        const shapeStore = useShapeStore.getState();
        const clickX = e.tx;
        const clickY = e.ty;

        // Commit/update current overlay automatically
        if (overlayStore.isOpen) {
            overlayStore.close();
        }

        // Hit-test existing text shapes
        const textShapes = shapeStore.shapeOrder
            .map((id) => shapeStore.shapes[id])
            .filter((s) => s && s.type === SHAPES.TEXT);

        const hitShape = textShapes.find((s) =>
            hitTestTextShape(s, clickX, clickY)
        );

        if (hitShape) {
            // Mark shape as editing
            shapeStore.updateShape(hitShape.id, { isEditing: true });

            overlayStore.open({
                position: { x: hitShape.x, y: hitShape.y },
                properties: hitShape.properties,
                text: hitShape.text,
                shapeId: hitShape.id,
                isNew: false,
            });
            return;
        }

        // Open new overlay
        overlayStore.open({
            position: { x: clickX, y: clickY },
            startPoint: { x: clickX, y: clickY },
            properties: this.properties,
        });
    }
}
