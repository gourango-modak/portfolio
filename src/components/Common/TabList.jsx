export const TabList = ({ items, activeTab, setActiveTab }) => (
    <div className="flex justify-center border-b border-gray-200">
        <div className="flex flex-wrap justify-center -mb-px rounded-lg p-1.5 gap-2 bg-gray-50">
            {items.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`py-3 px-6 rounded-md font-semibold cursor-pointer transition-colors duration-300 ${
                        activeTab === id
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-white text-slate-800 hover:bg-gray-100 border border-gray-300"
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    </div>
);
