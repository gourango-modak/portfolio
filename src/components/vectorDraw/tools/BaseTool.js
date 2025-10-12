import { toolbarSlice } from "../store/utils";

export class BaseTool {
    static name = "BASE";
    static label = "Base Tool";
    static shapeType = BaseTool.name;
    static shortcut = {};
    static cursor = "default";
    static defaultProperties = {};

    constructor(liveLayerRef) {
        this.liveLayerRef = liveLayerRef;
        this.liveElement = null;
        this.properties = this.getMergedProperties();
    }

    // Merge defaults + user's properties
    getMergedProperties() {
        const { toolProperties } = toolbarSlice.getSlice();
        const userProps = toolProperties?.[this.constructor.name] || {};

        // Merge: keep label from default, value from user's properties if available
        const merged = {};
        for (const key in this.constructor.defaultProperties) {
            merged[key] = {
                label: this.constructor.defaultProperties[key].label,
                value:
                    userProps[key]?.value ??
                    this.constructor.defaultProperties[key].value,
            };
        }
        return merged;
    }

    updateProperties() {
        this.properties = this.getMergedProperties();
    }

    // Create live SVG element
    createLiveElement(tag = "path") {
        this.liveElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            tag
        );
        if (this.liveLayerRef?.current) {
            this.liveLayerRef.current.appendChild(this.liveElement);
        }
    }

    // Remove live path and cleanup
    cleanUp() {
        if (this.liveElement) {
            this.liveElement?.remove?.();
            this.liveElement = null;
        }
    }

    // --- To be implemented by child classes ---
    onPointerDown(e) {}
    onPointerMove(e) {}
    onPointerUp(e) {}
}
