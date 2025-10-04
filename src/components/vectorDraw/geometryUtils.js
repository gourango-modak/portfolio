export const isPointInPolygon = (point, polygon) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0] ?? polygon[i].x;
        const yi = polygon[i][1] ?? polygon[i].y;
        const xj = polygon[j][0] ?? polygon[j].x;
        const yj = polygon[j][1] ?? polygon[j].y;

        const intersect =
            yi > point.y !== yj > point.y &&
            point.x <
                ((xj - xi) * (point.y - yi)) / (yj - yi + Number.EPSILON) + xi;

        if (intersect) inside = !inside;
    }
    return inside;
};

export const distancePointToSegment = (pt, p1, p2) => {
    const A = pt.x - p1.x;
    const B = pt.y - p1.y;
    const C = p2.x - p1.x;
    const D = p2.y - p1.y;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = len_sq !== 0 ? dot / len_sq : -1;

    let xx, yy;

    if (param < 0) {
        xx = p1.x;
        yy = p1.y;
    } else if (param > 1) {
        xx = p2.x;
        yy = p2.y;
    } else {
        xx = p1.x + param * C;
        yy = p1.y + param * D;
    }

    const dx = pt.x - xx;
    const dy = pt.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
};
