import { navLinks } from "../../Constants/Navigation"; // Adjust the path as needed
import { NavLink } from "react-router-dom";

const DesktopNav = () => {
	const activeStyle = {
		color: "#4f46e5", // indigo-600
		fontWeight: "600",
	};

	return (
		<div className="hidden md:flex space-x-8 items-center">
			{navLinks.map((link) => (
				<NavLink
					key={link.label}
					to={link.to}
					end
					style={({ isActive }) =>
						isActive ? activeStyle : undefined
					}
					className="text-slate-600 hover:text-indigo-600 transition-colors duration-300"
				>
					{link.label}
				</NavLink>
			))}
		</div>
	);
};

export default DesktopNav;
