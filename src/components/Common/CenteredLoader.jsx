import { useLoader } from "../../context/LoaderContext";

const CenteredLoader = () => {
    const { isLoading, message } = useLoader();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 pointer-events-none">
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center gap-3 pointer-events-auto">
                <div className="loader border-4 border-t-indigo-600 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
                <span className="text-gray-700 font-semibold">{message}</span>
            </div>
        </div>
    );
};

export default CenteredLoader;
