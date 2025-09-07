import {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
    useEffect,
} from "react";
import { TOOLS } from "../svgEdtiorConfig";

const defaultState = {
    orientation: "horizontal",
    position: { x: 20, y: 20 },
    selectedTool: TOOLS.PEN,
    visible: true, // Should show toolbar
    eraserSize: 20,
};

const ToolbarContext = createContext();

/** Toolbar Provider */
export const ToolbarProvider = ({ children }) => {
    const [state, setState] = useState(defaultState);

    // Update multiple toolbar properties
    const setToolbar = useCallback((partial) => {
        setState((prev) => ({ ...prev, ...partial }));
    }, []);

    // Update only selected tool
    const setTool = useCallback((tool) => {
        setState((prev) => ({ ...prev, selectedTool: tool }));
    }, []);

    const setVisible = useCallback((visible) => {
        setState((prev) => ({ ...prev, visible: visible }));
    }, []);

    const setPosition = useCallback((pos) => {
        setState((prev) => ({ ...prev, position: pos }));
    }, []);

    // useEffect(() => {
    //     console.log("Toolbar state changed:", state);
    // }, [state]);

    // Expose selectedTool directly, memoized for reactivity
    const contextValue = useMemo(
        () => ({
            state,
            setToolbar,
            selectedTool: state.selectedTool,
            setTool,
            orientation: state.orientation,
            setVisible,
            position: state.position,
            setPosition,
            eraserSize: state.eraserSize,
            visible: state.visible,
        }),
        [state, setToolbar, setTool, setVisible, setPosition]
    );

    return (
        <ToolbarContext.Provider value={contextValue}>
            {children}
        </ToolbarContext.Provider>
    );
};

/** Hook to consume toolbar context */
export const useToolbar = () => {
    const context = useContext(ToolbarContext);
    if (!context) {
        throw new Error("useToolbar must be used within a ToolbarProvider");
    }
    return context;
};
