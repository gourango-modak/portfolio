import { distancePointToSegment, pointInTriangle } from "../../utils/geometry";
import { LineShape } from "./LineShape";
import { SHAPES } from "./../shapeUtils";

export class ArrowShape extends LineShape {
    constructor(userSettings, page = null) {
        super(userSettings, page);
        this.type = SHAPES.ARROW.NAME;
    }

    defaultSettings() {
        return { color: "#000000", strokeWidth: 2, arrowHeadSize: 10 };
    }

    draw(svg) {
        super.draw(svg); // draw the line

        // Draw arrowhead
        const { arrowHeadSize } = this.settings;
        const dx = this.end.x - this.start.x;
        const dy = this.end.y - this.start.y;
        const angle = Math.atan2(dy, dx);

        const arrowLeft = {
            x: this.end.x - arrowHeadSize * Math.cos(angle - Math.PI / 6),
            y: this.end.y - arrowHeadSize * Math.sin(angle - Math.PI / 6),
        };
        const arrowRight = {
            x: this.end.x - arrowHeadSize * Math.cos(angle + Math.PI / 6),
            y: this.end.y - arrowHeadSize * Math.sin(angle + Math.PI / 6),
        };

        const arrow = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polygon"
        );
        arrow.setAttribute(
            "points",
            `${this.end.x},${this.end.y} ${arrowLeft.x},${arrowLeft.y} ${arrowRight.x},${arrowRight.y}`
        );
        arrow.setAttribute("fill", this.settings.color);
        svg.appendChild(arrow);
    }

    containsPoint(point, options = {}) {
        const tolerance = options.tolerance ?? this.settings.strokeWidth;

        // Check line segment
        if (super.containsPoint(point, options)) return true;

        // Arrowhead geometry
        const { arrowHeadSize } = this.settings;
        const dx = this.end.x - this.start.x;
        const dy = this.end.y - this.start.y;
        const angle = Math.atan2(dy, dx);

        const arrowLeft = {
            x: this.end.x - arrowHeadSize * Math.cos(angle - Math.PI / 6),
            y: this.end.y - arrowHeadSize * Math.sin(angle - Math.PI / 6),
        };
        const arrowRight = {
            x: this.end.x - arrowHeadSize * Math.cos(angle + Math.PI / 6),
            y: this.end.y - arrowHeadSize * Math.sin(angle + Math.PI / 6),
        };

        // Instead of strict pointInTriangle, measure distance to edges
        const d1 = distancePointToSegment(point, this.end, arrowLeft);
        const d2 = distancePointToSegment(point, this.end, arrowRight);
        const d3 = distancePointToSegment(point, arrowLeft, arrowRight);

        // Inside triangle or near any edge within tolerance
        return (
            pointInTriangle(point, this.end, arrowLeft, arrowRight) ||
            d1 <= tolerance ||
            d2 <= tolerance ||
            d3 <= tolerance
        );
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
        const shape = new ArrowShape(data.settings, data.page);
        shape.setPoints(data.start, data.end);
        return shape;
    }
}
