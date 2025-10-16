import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import CenteredLoader from "./components/common/CenteredLoader";
import RenderRoute from "./components/layout/RenderRoute";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AppProviders from "./context/AppProviders";
import { ROUTES } from "./route";

const App = () => {
    const adminRoutes = ROUTES.filter((r) => r.path.startsWith("/admin"));
    const publicRoutes = ROUTES.filter((r) => !r.path.startsWith("/admin"));

    return (
        <AppProviders>
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    {/* Public routes */}
                    {publicRoutes.map((route) => RenderRoute(route))}

                    {/* Protected admin routes */}
                    <Route element={<ProtectedRoute />}>
                        {adminRoutes.map((route) => RenderRoute(route))}
                    </Route>
                </Routes>
            </HashRouter>

            <CenteredLoader />
        </AppProviders>
    );
};

export default App;
