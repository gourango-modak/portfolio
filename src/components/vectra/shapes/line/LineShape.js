import { SHAPES } from "../shapeUtils";
import { distance, distancePointToSegment } from "./../../utils/geometry";
import { BaseShape } from "./../BaseShape";

export class LineShape extends BaseShape {
    constructor(userSettings, page = null) {
        super(userSettings, page);
        this.start = { x: 0, y: 0 };
        this.end = { x: 0, y: 0 };
        this.type = SHAPES.LINE.NAME;
    }

    defaultSettings() {
        return { color: "#000", strokeWidth: 2 };
    }

    setPoints(start, end) {
        this.start = start;
        this.end = end;
    }

    draw(svg) {
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );
        line.setAttribute("x1", this.start.x);
        line.setAttribute("y1", this.start.y);
        line.setAttribute("x2", this.end.x);
        line.setAttribute("y2", this.end.y);
        line.setAttribute("stroke", this.settings.color);
        line.setAttribute("stroke-width", this.settings.strokeWidth);
        svg.appendChild(line);
    }

    containsPoint(point, options = {}) {
        const tolerance = options.tolerance ?? this.settings.strokeWidth;
        return distancePointToSegment(point, this.start, this.end) <= tolerance;
    }

    serialize() {
        return {
            type: this.type,
            settings: this.settings,
            start: this.start,
            end: this.end,
            page: this.page,
        };
    }

    static deserialize(data) {
        const shape = new LineShape(data.settings);
        shape.setPoints(data.start, data.end);
        return shape;
    }

    isValid() {
        const { minLength } = this.settings;
        return distance(this.start, this.end) >= minLength;
    }
}
