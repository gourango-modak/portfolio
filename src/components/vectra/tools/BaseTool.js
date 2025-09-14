export class BaseTool {
    constructor(name, label, userSettings = {}) {
        this.name = name;
        this.label = label;
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
