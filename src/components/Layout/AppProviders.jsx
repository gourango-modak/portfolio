import { AuthProvider } from "../../context/AuthContext";
import { LoaderProvider } from "../../context/LoaderContext";

const providers = [AuthProvider, LoaderProvider];

const AppProviders = ({ children }) => {
    return providers.reduce(
        (acc, Provider) => <Provider>{acc}</Provider>,
        children
    );
};

export default AppProviders;
