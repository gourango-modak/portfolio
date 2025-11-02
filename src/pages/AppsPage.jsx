import { PenTool, Type } from "lucide-react";
import SectionHeader from "../components/section/SectionHeader";
import { AppCard } from "../components/common/AppCard";

export const APPLICATIONS = [
    {
        name: "Canvas Studio",
        description:
            "Sketch, design, and visualize ideas on a flexible and intuitive drawing board.",
        icon: PenTool,
        link: "/applications/canvas-studio",
    },
    {
        name: "Notepad",
        description:
            "Write, style, and organize your thoughts in a clean, distraction-free writing space.",
        icon: Type,
        link: "/applications/notepad",
    },
    {
        name: "DayNotes",
        description:
            "Capture daily tasks, notes, and ideas in a simple, date-focused editor. Review recent entries and stay organized at a glance.",
        icon: Type,
        link: "/applications/daynotes",
    },
];

const AppsPage = () => {
    return (
        <main className="pt-30 pb-20 section-m-h bg-gray-50/50">
            <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                <SectionHeader
                    title="My Toolkit"
                    text="These are applications I personally developed to streamline creative and technical workflows—making drawing, note-taking, blog writing, and creating technical documentation or diagrams seamless, efficient, and effortless."
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {APPLICATIONS.map((app) => (
                        <AppCard key={app.name} app={app} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default AppsPage;
