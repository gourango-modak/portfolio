/**
 * Smooth scroll to an element by ID
 */
export const scrollToSection = (id, offset = 120) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
};
