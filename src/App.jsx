import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import CenteredLoader from "./components/common/CenteredLoader";
import { ROUTES } from "./config";
import RenderRoute from "./components/layout/RenderRoute";
import AppProviders from "./components/layout/AppProviders";

const App = () => {
    return (
        <AppProviders>
            <HashRouter>
                <ScrollToTop />
                <Routes>{ROUTES.map((route) => RenderRoute(route))}</Routes>
            </HashRouter>
            <CenteredLoader />
        </AppProviders>
    );
};

export default App;
