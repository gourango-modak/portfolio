// tools/BaseTool.js
export class BaseTool {
    constructor(name, userSettings = {}) {
        this.name = name;
        this.settings = { ...this.defaultSettings(), ...userSettings };
        this.currentShape = null;
    }

    defaultSettings() {
        return {};
    }

    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
    }

    onPointerDown(event) {}
    onPointerMove(event) {}
    onPointerUp() {}
}
