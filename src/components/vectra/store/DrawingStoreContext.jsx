import { useContext } from "react";
import { createContext } from "react";

export const DrawingStoreContext = createContext(null);

export const useDrawingStore = () => {
    const context = useContext(DrawingStoreContext);
    return context;
};
