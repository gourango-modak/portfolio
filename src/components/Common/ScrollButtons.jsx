import { ArrowUp, ArrowDown } from "lucide-react";

export const ScrollButtons = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const scrollToBottom = () =>
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });

    return (
        <div className="fixed bottom-8 right-8 md:flex flex-col gap-3 hidden">
            <button
                onClick={scrollToTop}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg transition cursor-pointer"
            >
                <ArrowUp size={20} />
            </button>
            <button
                onClick={scrollToBottom}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 shadow-lg transition cursor-pointer"
            >
                <ArrowDown size={20} />
            </button>
        </div>
    );
};
