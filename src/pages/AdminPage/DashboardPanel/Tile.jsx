export const Tile = ({ title, count, icon, color = "indigo" }) => {
    const iconBg = `bg-${color}-100`;
    const iconColor = `text-${color}-600`;

    return (
        <div className="relative p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex items-center justify-between">
            <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${iconBg} ${iconColor}`}
            >
                {icon}
            </div>

            <div className="ml-4 flex-1">
                <h4 className="text-base font-medium text-gray-500">{title}</h4>
                <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
            </div>
        </div>
    );
};
