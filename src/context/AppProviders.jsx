import { AlertProvider } from "./AlertProvider";
import { AuthProvider } from "./AuthContext";
import { LoaderProvider } from "./LoaderContext";

const providers = [AuthProvider, LoaderProvider, AlertProvider];

const AppProviders = ({ children }) => {
    return providers.reduce(
        (acc, Provider) => <Provider>{acc}</Provider>,
        children
    );
};

export default AppProviders;
