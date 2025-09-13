import { useState } from "react";

export const useToolbar = () => {
    const [toolbarSettings, setToolbarSettings] = useState({
        visible: true,
        orientation: "horizontal",
        position: { x: 20, y: 20 },
    });

    const updateToolbarPosition = ({ x, y }) => {
        setToolbarSettings((prev) => ({ ...prev, position: { x, y } }));
    };

    return { toolbarSettings, setToolbarSettings, updateToolbarPosition };
};
