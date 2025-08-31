export const AccordionItem = ({ title, isOpen, onToggle, children }) => (
    <div className="rounded-lg shadow-sm border border-gray-300 bg-white transition-colors duration-300">
        <button
            onClick={onToggle}
            className={`w-full flex justify-between items-center p-4 font-semibold text-left transition-colors duration-300 ${
                isOpen ? "text-indigo-700" : "text-slate-800"
            }`}
        >
            <span>{title}</span>
            <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-indigo-600" : "text-slate-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                ></path>
            </svg>
        </button>
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96" : "max-h-0"
            }`}
        >
            <div className="p-4 border-t border-gray-200">{children}</div>
        </div>
    </div>
);
