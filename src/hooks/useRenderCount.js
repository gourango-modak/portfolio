import { useRef, useEffect } from "react";

/**
 * Hook to track how many times a component renders.
 */
export const useRenderCount = (componentName = "Component", props = {}) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    useEffect(() => {
        console.log(`${componentName} render #${renderCount.current}`, props);
    });

    return renderCount.current;
};
