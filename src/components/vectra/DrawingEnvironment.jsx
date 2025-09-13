import { Canvas } from "./canvas/Canvas";
import { DrawingStoreProvider } from "./store/DrawingStoreContext";
import { Toolbar } from "./toolbar/Toolbar";

export const DrawingEnvironment = () => {
    return (
        <DrawingStoreProvider>
            <Toolbar />
            <Canvas />
        </DrawingStoreProvider>
    );
};
