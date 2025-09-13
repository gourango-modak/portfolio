import { BaseShape } from "./../BaseShape";

export class TextShape extends BaseShape {
    constructor(settings) {
        super(settings);
        this.text = "";
        this.position = null;
        this.type = "text";
        this.page = this.settings.page;
    }

    defaultSettings() {
        return { color: "#000", fontSize: 16, fontFamily: "Arial" };
    }

    setPosition(position) {
        this.position = { ...position };
    }

    setText(text) {
        this.text = text;
    }

    draw(svg) {
        const textEl = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        textEl.setAttribute("x", this.position.x);
        textEl.setAttribute("y", this.position.y);
        textEl.setAttribute("fill", this.settings.color);
        textEl.setAttribute("font-size", this.settings.fontSize);
        textEl.setAttribute("font-family", this.settings.fontFamily);
        textEl.textContent = this.text;
        svg.appendChild(textEl);
    }

    containsPoint(point, options = {}) {
        // Very simple bounding box check; can be enhanced
        const tolerance = options.tolerance ?? 5;
        const { x, y } = this.position;
        const width = this.text.length * (this.settings.fontSize * 0.6); // approx width
        const height = this.settings.fontSize;
        return (
            point.x >= x - tolerance &&
            point.x <= x + width + tolerance &&
            point.y >= y - height - tolerance &&
            point.y <= y + tolerance
        );
    }

    serialize() {
        return {
            type: "text",
            settings: this.settings,
            position: this.position,
            text: this.text,
            page: this.page,
        };
    }

    static deserialize(data) {
        const shape = new TextShape(data.settings);
        shape.position = data.position;
        shape.text = data.text;
        return shape;
    }
}
