import { PenSquare, PlusSquare } from "lucide-react";
import { AppCard } from "../../components/common/AppCard";
import { APPLICATIONS } from "../AppsPage";

const applications = [
    ...APPLICATIONS,
    {
        name: "Create New Blog",
        description: "Start writing and publishing a new blog post.",
        icon: PenSquare,
        link: "/admin/blog",
    },
    {
        name: "Add New Project",
        description: "Showcase your latest work by adding a new project.",
        icon: PlusSquare,
        link: "/admin/project",
    },
];

export const AppsPanel = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {applications.map((app) => (
                <AppCard key={app.name} app={app} />
            ))}
        </div>
    );
};
