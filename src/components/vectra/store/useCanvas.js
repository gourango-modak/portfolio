import { useState } from "react";

export const useCanvas = () => {
    const [canvasSettings, setCanvasSettings] = useState({
        scale: 1,
        pan: { x: 0, y: 0 },
    });
    return { canvasSettings, setCanvasSettings };
};
