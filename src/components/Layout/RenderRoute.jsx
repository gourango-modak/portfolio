import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PageWrapper from "./PageWrapper";

export default function RenderRoute(route) {
    if (route.protected) {
        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    <ProtectedRoute>
                        <PageWrapper
                            component={route.component}
                            layout={route.layout}
                        />
                    </ProtectedRoute>
                }
            />
        );
    }

    return (
        <Route
            key={route.path}
            path={route.path}
            element={
                <PageWrapper
                    component={route.component}
                    layout={route.layout}
                />
            }
        />
    );
}
