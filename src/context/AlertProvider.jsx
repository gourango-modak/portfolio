import { createContext, useContext, useState, useCallback } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        isOpen: false,
        title: "",
        message: "",
        type: "info", // info | success | warning | error
        buttons: null, // array of { label, onClick, type: 'primary'|'secondary' }
    });

    const showAlert = useCallback((message, options = {}) => {
        const { title = "", type = "info", buttons = null } = options;
        setAlert({ isOpen: true, title, message, type, buttons });
    }, []);

    const hideAlert = useCallback(() => {
        setAlert((prev) => ({ ...prev, isOpen: false }));
    }, []);

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}

            {/* Alert Modal */}
            {alert.isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
                        <h3
                            className={`text-lg font-bold mb-4 ${
                                alert.type === "success"
                                    ? "text-green-600"
                                    : alert.type === "warning"
                                    ? "text-yellow-600"
                                    : alert.type === "error"
                                    ? "text-red-600"
                                    : "text-blue-600"
                            }`}
                        >
                            {alert.title}
                        </h3>
                        <p className="text-gray-700 mb-6">{alert.message}</p>
                        <div className="flex justify-end gap-3">
                            {(
                                alert.buttons || [
                                    {
                                        label: "Okay",
                                        type: "primary",
                                        onClick: hideAlert,
                                    },
                                ]
                            ).map((btn, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (btn.onClick) btn.onClick();
                                        hideAlert();
                                    }}
                                    className={`px-4 py-2 rounded-lg transition font-semibold cursor-pointer ${
                                        btn.type === "primary"
                                            ? "bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);
