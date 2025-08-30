import { useEffect, useState } from "react";
import Navbar from "./Navbar/index";
import Footer from "./Footer";

export default function Layout({ children }) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Navbar scrolled={scrolled} />
            {children}
            <Footer />
        </>
    );
}
