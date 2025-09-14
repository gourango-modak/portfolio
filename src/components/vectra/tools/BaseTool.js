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

    // Should show the tool in the toolbar
    show() {
        return true;
    }

    onPointerDown(event) {}
    onPointerMove(event) {}
    onPointerUp() {}
}
