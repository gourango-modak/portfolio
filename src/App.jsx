import { HashRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogPostDetailPage from "./pages/BlogPostDetailPage";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/Common/ScrollToTop";
import { useState } from "react";

const App = () => {
    return (
        <HashRouter>
            <ScrollToTop />
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <MainLayout>
                            <About />
                        </MainLayout>
                    }
                />
                <Route
                    path="/blog"
                    element={
                        <MainLayout>
                            <Blog />
                        </MainLayout>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <MainLayout>
                            <Projects />
                        </MainLayout>
                    }
                />
                <Route
                    path="/projects/:id"
                    element={
                        <MainLayout>
                            <ProjectDetailPage />
                        </MainLayout>
                    }
                />
                <Route
                    path="/blog/:id"
                    element={
                        <MainLayout>
                            <BlogPostDetailPage />
                        </MainLayout>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <MainLayout>
                            <Contact />
                        </MainLayout>
                    }
                />
            </Routes>
        </HashRouter>
    );
};

export default App;
