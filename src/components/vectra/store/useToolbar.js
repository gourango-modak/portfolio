import { useState } from "react";
import { ORIENTATION } from "./../../../utils/common";

export const useToolbar = () => {
    const [toolbarSettings, setToolbarSettings] = useState({
        visible: false,
        orientation: ORIENTATION.HORIZONTAL,
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
