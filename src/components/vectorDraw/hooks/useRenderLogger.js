import { useRef, useEffect } from "react";

export function useRenderLogger(componentName) {
    const renderCount = useRef(0);

    renderCount.current += 1;

    useEffect(() => {
        console.log(
            `%c[RenderLogger] ${componentName} render #${renderCount.current}`,
            "color: green; font-weight: bold;"
        );
    });
}
