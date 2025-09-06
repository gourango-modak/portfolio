import { createContext, useContext, useState, useCallback } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("Loading...");

    const showLoader = useCallback((msg = "Loading...") => {
        setMessage(msg);
        setIsLoading(true);
    }, []);

    const hideLoader = useCallback(() => setIsLoading(false), []);

    const withLoader = useCallback(
        async (asyncFn, msg = "Loading...") => {
            showLoader(msg);
            try {
                const result = await asyncFn();
                return result;
            } finally {
                hideLoader();
            }
        },
        [showLoader, hideLoader]
    );

    return (
        <LoaderContext.Provider
            value={{ isLoading, message, showLoader, hideLoader, withLoader }}
        >
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);
