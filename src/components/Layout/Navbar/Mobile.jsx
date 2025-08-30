import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../../config";

const MobileNavbar = ({ closeMenu }) => {
    const mobileActiveStyle = {
        color: "#4f46e5", // indigo-600
        fontWeight: "600",
        backgroundColor: "#eef2ff", // indigo-50
    };

    return (
        <div className="container mx-auto md:hidden backdrop-blur-lg px-6 pb-4">
            {NAV_LINKS.map((link) => (
                <NavLink
                    key={link.label}
                    to={link.to}
                    end
                    onClick={closeMenu}
                    style={({ isActive }) =>
                        isActive ? mobileActiveStyle : undefined
                    }
                    className="block py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md -mx-3 px-3"
                >
                    {link.label}
                </NavLink>
            ))}
        </div>
    );
};

export default MobileNavbar;
