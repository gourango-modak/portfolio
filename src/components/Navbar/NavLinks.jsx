import { Link, useLocation } from "react-router-dom";

const NavLinks = ({ isMobile = false }) => {
	const location = useLocation();
	const currentPath = location.pathname;

	const linkClass = isMobile
		? "block py-2 hover:text-neutral-900 dark:hover:text-white text-neutral-500"
		: "hover:text-neutral-900 dark:hover:text-white text-neutral-500";

	const links = [
		{ name: "Home", path: "/" },
		{ name: "Blog", path: "/blog" },
		{ name: "Projects", path: "/projects" },
		{ name: "About", path: "/about" },
	];

	return (
		<>
			{links.map(({ name, path }) => {
				const isActive = currentPath === path;
				return (
					<Link
						key={path}
						to={path}
						className={`${linkClass} ${
							isActive
								? "text-neutral-900 dark:text-white font-semibold"
								: ""
						}`}
					>
						{name}
					</Link>
				);
			})}
		</>
	);
};

export default NavLinks;
