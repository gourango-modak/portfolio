import { FileText, Layers, Activity, PieChart } from "lucide-react";

// Modern Big Tile Component
const Tile = ({ title, count, icon, color = "indigo" }) => {
    const iconBg = `bg-${color}-100`;
    const iconColor = `text-${color}-600`;

    return (
        <div className="relative p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex items-center justify-between">
            {/* Icon Circle */}
            <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${iconBg} ${iconColor}`}
            >
                {icon}
            </div>

            {/* Info */}
            <div className="ml-4 flex-1">
                <h4 className="text-base font-medium text-gray-500">{title}</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
            </div>
        </div>
    );
};

// Dashboard Panel
const DashboardPanel = () => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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

export default DashboardPanel;
