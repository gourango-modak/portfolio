import { BaseShape } from "./../BaseShape";
import getStroke from "perfect-freehand";
import {
    distancePointToSegment,
    getSvgPathFromStroke,
} from "../../utils/geometry";
import { SHAPES } from "../shapeUtils";

export class PolylineShape extends BaseShape {
    constructor(userSettings, page = null) {
        super(userSettings, page);
        this.points = [];
        this.type = SHAPES.POLYLINE.NAME;
    }

    defaultSettings() {
        return {
            strokeColor: "#000000",
            strokeWidth: 2,
            minPoints: 2,
            thinning: 0.5,
            smoothing: 0.5,
            streamline: 0.5,
        };
    }

    addPoint({ x, y, pressure }) {
        this.points.push({ x, y, pressure });
    }

    isValid() {
        return this.points.length >= (this.settings.minPoints || 2);
    }

    finalize() {
        this.points = getStroke(this.points, {
            size: this.settings.strokeWidth,
            thinning: this.settings.thinning,
            smoothing: this.settings.smoothing,
            streamline: this.settings.streamline,
        });
    }

    draw(svg, savedShape = false) {
        // Generate stroke points with perfect-freehand if not already saved
        const strokePoints = savedShape
            ? this.points
            : getStroke(this.points, {
                  size: this.settings.strokeWidth,
                  thinning: this.settings.thinning,
                  smoothing: this.settings.smoothing,
                  streamline: this.settings.streamline,
              });

        // Convert stroke points to SVG path
        const pathData = getSvgPathFromStroke(strokePoints);

        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        path.setAttribute("d", pathData);
        path.setAttribute("fill", this.settings.strokeColor);
        path.setAttribute("stroke", this.settings.strokeColor);
        svg.appendChild(path);
    }

    containsPoint(point, options = {}) {
        const tolerance = options.tolerance;

        for (let i = 0; i < this.points.length - 1; i++) {
            const [x1, y1] = this.points[i];
            const [x2, y2] = this.points[i + 1];
            const p1 = { x: x1, y: y1 };
            const p2 = { x: x2, y: y2 };
            if (distancePointToSegment(point, p1, p2) <= tolerance) return true;
        }
    }

    serialize() {
        return {
            type: this.type,
            settings: this.settings,
            points: this.points,
            page: this.page,
        };
    }

    static deserialize(data) {
        const shape = new PolylineShape(data.settings);
        shape.points = data.points;
        return shape;
    }
}
