import {
    FileText,
    Layers,
    FolderTree,
    Tags,
    Clock,
    Hammer,
} from "lucide-react";
import { Tile } from "./Tile";
import {
    getTotalPostsCount,
    getInProgressPostsCount,
} from "../../../data/posts";
import {
    getTotalProjectsCount,
    getInProgressProjectsCount,
} from "../../../data/projects";
import { getTotalCategoriesCount } from "../../../data/categories";
import { getTotalTagsCount } from "../../../data/utils";

export const DashboardPanel = () => {
    const tiles = [
        {
            title: "Total Blogs",
            count: getTotalPostsCount(),
            icon: <FileText size={32} />,
        },
        {
            title: "Total Projects",
            count: getTotalProjectsCount(),
            icon: <Layers size={32} />,
        },
        {
            title: "Total Categories",
            count: getTotalCategoriesCount(),
            icon: <FolderTree size={32} />,
        },
        {
            title: "Total Tags",
            count: getTotalTagsCount(),
            icon: <Tags size={32} />,
        },
        {
            title: "Total In Progress Posts",
            count: getInProgressPostsCount(),
            icon: <Clock size={32} />,
        },
        {
            title: "Total In Progress Projects",
            count: getInProgressProjectsCount(),
            icon: <Hammer size={32} />,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {tiles.map((tile, index) => (
                <Tile
                    key={index}
                    title={tile.title}
                    count={tile.count}
                    icon={tile.icon}
                />
            ))}
        </div>
    );
};
