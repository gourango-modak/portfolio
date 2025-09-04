import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage/ProjectDetailPage";
import PostDetailPage from "./pages/PostDetailPage/PostDetailPage";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./components/Common/ScrollToTop";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <HomePage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <Layout>
                                <AboutPage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/blog"
                        element={
                            <Layout>
                                <BlogPage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/projects"
                        element={
                            <Layout>
                                <ProjectsPage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/projects/:slug"
                        element={
                            <Layout>
                                <ProjectDetailPage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/blog/:slug"
                        element={
                            <Layout>
                                <PostDetailPage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <Layout>
                                <ContactPage />
                            </Layout>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </HashRouter>
        </AuthProvider>
    );
};

export default App;
