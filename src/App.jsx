import { HashRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/Common/ScrollToTop";
import { useState } from "react";

const App = () => {
	const [darkMode, setDarkMode] = useState(false);

	return (
		<HashRouter>
			<ScrollToTop />
			<Routes>
				<Route
					path="/"
					element={
						<MainLayout
							darkMode={darkMode}
							setDarkMode={setDarkMode}
						>
							<Home
								darkMode={darkMode}
								setDarkMode={setDarkMode}
							/>
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
							<BlogDetailPage />
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
