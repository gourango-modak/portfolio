class MouseManager {
    static instance = null;

    static EventType = Object.freeze({
        DOWN: "down",
        MOVE: "move",
        UP: "up",
    });

    constructor() {
        if (MouseManager.instance) return MouseManager.instance;

        this.subscribers = new Set();
        this.lastEvent = null;
        this.rafId = null;
        this.currentElement = null;

        this.handleMove = this.handleMove.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);

        MouseManager.instance = this;
        window.addEventListener("mousedown", this.handleDown);

        return this;
    }

    static getInstance() {
        if (!MouseManager.instance) {
            MouseManager.instance = new MouseManager();
        }
        return MouseManager.instance;
    }

    subscribe(callback, element) {
        const subscriber = { callback, element };
        this.subscribers.add(subscriber);

        return () => this.subscribers.delete(subscriber);
    }

    handleDown(e) {
        // Pass 1: element-specific subscribers
        for (let { callback, element } of this.subscribers) {
            if (!element) continue;
            if (element.contains(e.target)) {
                this.currentElement = element;
                callback(MouseManager.EventType.DOWN, e);
                window.addEventListener("mousemove", this.handleMove);
                window.addEventListener("mouseup", this.handleUp);
                break;
            }
        }

        // Pass 2: global subscribers
        for (let { callback, element } of this.subscribers) {
            if (!element) callback(MouseManager.EventType.DOWN, e);
        }
    }

    handleMove(e) {
        this.lastEvent = e;
        if (!this.rafId) {
            this.rafId = requestAnimationFrame(() => {
                const ev = this.lastEvent;
                if (!ev) return;

                for (let { callback, element } of this.subscribers) {
                    if (element === this.currentElement) {
                        callback(MouseManager.EventType.MOVE, ev);
                    }
                }

                this.lastEvent = null;
                this.rafId = null;
            });
        }
    }

    handleUp(e) {
        for (let { callback, element } of this.subscribers) {
            if (element === this.currentElement) {
                callback(MouseManager.EventType.UP, e);
            }
        }
        window.removeEventListener("mousemove", this.handleMove);
        window.removeEventListener("mouseup", this.handleUp);
        this.currentElement = null;
    }
}

export default MouseManager;
