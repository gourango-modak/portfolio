export class BaseShape {
    constructor(userSettings = {}) {
        // Merge default settings with user settings
        this.settings = { ...this.defaultSettings(), ...userSettings };
        this.page = 1;
    }

    // Default settings for shape (can be overridden)
    defaultSettings() {
        return {};
    }

    draw(svg) {
        throw new Error("Draw method must be implemented by subclass");
    }

    /**
     * Check if a point is inside the shape
     * @param {object} point {x, y}
     * @param {object} options extra options like tolerance
     * @returns {boolean}
     */
    containsPoint(point, options = {}) {
        throw new Error("containsPoint must be implemented in subclass");
    }

    serialize() {
        throw new Error("Serialize method must be implemented by subclass");
    }

    static deserialize(data) {
        throw new Error("Deserialize method must be implemented by subclass");
    }
}
