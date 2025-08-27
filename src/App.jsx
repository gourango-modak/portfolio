import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPostPage";
import { useState } from "react";
import Projects from "./pages/Projects";

const App = () => {
	const [darkMode, setDarkMode] = useState(false);
	return (
		<BrowserRouter>
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
					path="/blog/:slug"
					element={
						<MainLayout>
							<BlogPostPage />
						</MainLayout>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
