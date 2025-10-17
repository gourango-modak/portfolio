import { TEXT_LINE_HEIGHT } from "../../tools/constants";

export function createTextShape(shape) {
    const ns = "http://www.w3.org/2000/svg";

    const g = document.createElementNS(ns, "g");
    g.setAttribute(
        "transform",
        `translate(${shape.x}, ${shape.isFrameTitle ? shape.y : shape.y})`
    );

    const textEl = document.createElementNS(ns, "text");
    textEl.setAttribute("x", 0);
    textEl.setAttribute("y", 0);
    textEl.setAttribute("fill", shape.properties.color.value);
    textEl.setAttribute("font-size", `${shape.properties.fontSize.value}px`);
    textEl.setAttribute("font-family", shape.properties.fontFamily.value);
    textEl.setAttribute(
        "font-weight",
        shape.properties.fontWeight?.value || "normal"
    );
    textEl.setAttribute(
        "letter-spacing",
        shape.properties.letterSpacing?.value || "normal"
    );

    // Split text by newlines and create <tspan> for each line
    const lines = shape.text.split(/\r?\n/);
    lines.forEach((line, i) => {
        const tspan = document.createElementNS(ns, "tspan");
        tspan.setAttribute("x", 0);
        tspan.setAttribute(
            "dy",
            i === 0 ? 0 : shape.properties.fontSize.value * TEXT_LINE_HEIGHT
        );
        tspan.textContent = line || " "; // preserve empty lines
        textEl.appendChild(tspan);
    });

    g.appendChild(textEl);
    return g;
}
