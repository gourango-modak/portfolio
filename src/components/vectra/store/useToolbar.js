import { useState } from "react";

export const useToolbar = () => {
    const [toolbarSettings, setToolbarSettings] = useState({
        visible: false,
        orientation: "horizontal", // horizontal | vertical
        position: { x: 0, y: 0 },
    });

    const updateToolbarPosition = ({ x, y }) => {
        setToolbarSettings((prev) => ({ ...prev, position: { x, y } }));
    };

    const setToolbarVisiblity = (visible) => {
        setToolbarSettings((prev) => ({ ...prev, visible: visible }));
    };

    return {
        toolbarSettings,
        setToolbarSettings,
        updateToolbarPosition,
        setToolbarVisiblity,
    };
};
