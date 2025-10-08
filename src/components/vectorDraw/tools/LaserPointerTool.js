import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "../utils/svgUtils";
import { BaseTool } from "./BaseTool";
import { TOOLS } from "./constants";

export class LaserPointerTool extends BaseTool {
    static name = TOOLS.LASER_POINTER;
    static label = "Laser Pointer";
    static shortcut = { code: "KeyL" };

    static defaultProperties = {
        color: { value: "#FF0000", label: "Color", type: "color" },
        strokeWidth: {
            value: 8,
            label: "Width",
            type: "slider",
            min: 1,
            max: 30,
            step: 1,
        },
        duration: {
            value: 800,
            label: "Fade Duration (ms)",
            type: "slider",
            min: 100,
            max: 3000,
            step: 100,
        },
        smoothing: {
            value: 0.6,
            label: "Smoothing",
            type: "slider",
            min: 0,
            max: 1,
            step: 0.1,
        },
    };

    constructor(liveLayerRef) {
        super(liveLayerRef);

        this.liveLayer = liveLayerRef.current;
        this.isDrawing = false;
        this.points = [];
        this.activePaths = []; // Tracks paths currently fading out

        // Bind and start animation loop for fading effect
        this.animate = this.animate.bind(this);
        this.animFrame = requestAnimationFrame(this.animate);
    }

    onPointerDown(e) {
        this.isDrawing = true;
        this.points = [];
        this.addPoint(e.tx, e.ty);
    }

    onPointerMove(e) {
        if (!this.isDrawing) return;
        this.addPoint(e.tx, e.ty);
        this.updateLivePreview();
    }

    onPointerUp() {
        if (!this.isDrawing || this.points.length < 2) return;
        this.isDrawing = false;

        const pathEl = this.createPathFromPoints(this.points);
        this.liveLayer.appendChild(pathEl);

        // Track this path for fade-out animation
        this.activePaths.push({ el: pathEl, createdAt: performance.now() });

        // Remove temporary live preview stroke
        if (this.livePreviewPath) {
            this.liveLayer.removeChild(this.livePreviewPath);
            this.livePreviewPath = null;
        }
    }

    addPoint(x, y) {
        this.points.push({ x, y });
    }

    updateLivePreview() {
        // Create or update the preview stroke while drawing
        const stroke = getStroke(
            this.points.map((p) => [p.x, p.y, 0.5]),
            {
                size: this.properties.strokeWidth.value,
                smoothing: this.properties.smoothing.value,
                thinning: 0.5,
                streamline: 0.4,
            }
        );

        const pathData = getSvgPathFromStroke(stroke);

        if (!this.livePreviewPath) {
            this.livePreviewPath = this.createSvgPath(
                this.properties.color.value
            );
            this.liveLayer.appendChild(this.livePreviewPath);
        }

        this.livePreviewPath.setAttribute("d", pathData);
    }

    createPathFromPoints(points) {
        const stroke = getStroke(
            points.map((p) => [p.x, p.y, 0.5]),
            {
                size: this.properties.strokeWidth.value,
                smoothing: this.properties.smoothing.value,
                thinning: 0.5,
                streamline: 0.4,
            }
        );

        const pathData = getSvgPathFromStroke(stroke);
        const pathEl = this.createSvgPath(this.properties.color.value);
        pathEl.setAttribute("d", pathData);

        return pathEl;
    }

    createSvgPath(fillColor) {
        const pathEl = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        pathEl.setAttribute("fill", fillColor);
        pathEl.setAttribute("fill-opacity", "1");
        pathEl.setAttribute("stroke", "none");
        pathEl.setAttribute("pointer-events", "none");
        return pathEl;
    }

    animate() {
        const fadeDuration = this.properties.duration.value;
        const now = performance.now();

        this.activePaths = this.activePaths.filter((p) => {
            const age = now - p.createdAt;

            // Remove fully faded paths
            if (age >= fadeDuration) {
                this.liveLayer.removeChild(p.el);
                return false;
            }

            // Fade opacity over time (linear interpolation)
            const opacity = 1 - age / fadeDuration;
            p.el.setAttribute("fill-opacity", opacity.toFixed(2));
            return true;
        });

        // Keep the loop running
        this.animFrame = requestAnimationFrame(this.animate);
    }

    cleanUp() {
        cancelAnimationFrame(this.animFrame);
        this.activePaths.forEach((p) => p.el.remove());
        if (this.livePreviewPath) this.livePreviewPath.remove();

        this.activePaths = [];
        this.points = [];
        this.cleanUp();
    }
}
