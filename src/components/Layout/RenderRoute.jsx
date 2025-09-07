import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PageWrapper from "./PageWrapper";

export default function RenderRoute(route) {
    if (route.protected) {
        return (
            <Route
                key={route.path}
                path={route.path}
                element={<ProtectedRoute />}
            >
                {route.children.map((child) => (
                    <Route
                        key={child.path}
                        path={child.path}
                        element={
                            <PageWrapper
                                component={child.component}
                                layout={child.layout}
                            />
                        }
                    />
                ))}
            </Route>
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
