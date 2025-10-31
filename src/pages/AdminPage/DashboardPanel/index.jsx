import { FileText, Layers, Activity, PieChart } from "lucide-react";
import { Tile } from "./Tile";

export const DashboardPanel = () => {
    const tiles = [
        {
            title: "Total Blogs",
            count: 25,
            icon: <FileText size={32} />,
            color: "indigo",
        },
        {
            title: "Total Projects",
            count: 12,
            icon: <Layers size={32} />,
            color: "green",
        },
        {
            title: "Categories",
            count: 8,
            icon: <PieChart size={32} />,
            color: "yellow",
        },
        {
            title: "In Progress",
            count: 5,
            icon: <Activity size={32} />,
            color: "pink",
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
                    color={tile.color}
                />
            ))}
        </div>
    );
};
