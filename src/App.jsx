import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoaderProvider } from "./context/LoaderContext";
import ScrollToTop from "./components/common/ScrollToTop";
import CenteredLoader from "./components/common/CenteredLoader";
import { ROUTES } from "./config";
import PageWrapper from "./components/layout/PageWrapper";

const App = () => {
    return (
        <AuthProvider>
            <LoaderProvider>
                <HashRouter>
                    <ScrollToTop />
                    <Routes>
                        {ROUTES.map(({ path, component, layout }) => (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <PageWrapper
                                        component={component}
                                        layout={layout}
                                    />
                                }
                            />
                        ))}
                    </Routes>
                </HashRouter>
                <CenteredLoader />
            </LoaderProvider>
        </AuthProvider>
    );
};

export default App;
