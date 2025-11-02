import { CalendarDays } from "lucide-react";

export const DateButton = ({ date, active, onClick, hasNote }) => {
    const getLocalISODate = (date) => {
        if (!(date instanceof Date)) return "";
        const localDate = new Date(date);
        localDate.setMinutes(
            localDate.getMinutes() - localDate.getTimezoneOffset()
        );
        return localDate.toISOString().split("T")[0];
    };

    return (
        <button
            onClick={onClick}
            className={`px-4 py-3 text-left text-sm transition-colors w-full cursor-pointer flex items-center justify-between rounded-md ${
                active
                    ? "text-indigo-600 border-l-4 border-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:bg-gray-100"
            }`}
        >
            <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <div>
                    <div className="font-semibold">
                        {date.toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        })}
                    </div>
                    <div className="text-gray-500 text-xs">
                        {getLocalISODate(date)}
                    </div>
                </div>
            </div>
            {hasNote && <span className="w-2 h-2 rounded-full bg-green-500" />}
        </button>
    );
};
