import { useContext } from "react";
import { DrawingStoreContext } from "./DrawingStoreContext";

export const useDrawingStore = () => {
    const context = useContext(DrawingStoreContext);
    return context;
};
