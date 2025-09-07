import { useRef } from "react";
import { Save, ArrowUp, ArrowDown } from "lucide-react";
import EditorJs from "../../components/editorJs/EditorJs";
import { validateEditorJsModal } from "../../components/editorJs/editorJsUtils";
import { useAlert } from "../../context/AlertProvider";
import { getEditorJsInitialData } from "../../components/editorJs/editorJsConfig";

const RichTextEditorPage = () => {
    const editorRef = useRef(null);
    const { showAlert } = useAlert();

    const handleSaveClick = () => {
        if (editorRef.current) {
            editorRef.current.save();
        }
    };

    const handleDataAfterSave = (editorData) => {
        const isValid = validateEditorJsModal(null, editorData, showAlert);
        if (!isValid) return;
        onSave(editorData);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 relative">
            {/* Card layout */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col">
                {/* Editor content */}
                <div className="flex-1 min-h-[70vh]">
                    <EditorJs
                        ref={editorRef}
                        onSave={handleDataAfterSave}
                        initialData={getEditorJsInitialData()}
                    />
                </div>

                {/* Save button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleSaveClick}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-md transition cursor-pointer"
                    >
                        <Save className="w-5 h-5" />
                        Save
                    </button>
                </div>
            </div>

            {/* Scroll buttons */}
            <div className="fixed bottom-8 right-8 xl:flex flex-col gap-3 hidden">
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
        </div>
    );
};

export default RichTextEditorPage;
