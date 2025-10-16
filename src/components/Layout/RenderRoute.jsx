import { Route } from "react-router-dom";
import PageWrapper from "./PageWrapper";

export default function RenderRoute(route) {
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
