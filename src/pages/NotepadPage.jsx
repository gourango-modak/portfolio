import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import EditorJs from "../components/editorJs/EditorJs";
import { EDITOR_JS_INITIALDATA } from "../components/editorJs/editorJsConfig";

const NotepadPage = () => {
    const editorRef = useRef(null);
    const [initialData, setInitialData] = useState(EDITOR_JS_INITIALDATA);

    const handleDataAfterSave = (editorData) => {
        localStorage.setItem("gm-notes", JSON.stringify(editorData));
    };

    const handleOnChange = async () => {
        if (editorRef.current) {
            await editorRef.current.save();
        }
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

    useEffect(() => {
        const noteData = localStorage.getItem("gm-notes");
        if (noteData) {
            setInitialData(JSON.parse(noteData));
        }
    }, []);

    console.log(initialData);

    return (
        <div className="max-w-6xl mx-auto px-4 relative">
            {/* Card layout */}
            <div className="bg-white px-6 flex flex-col">
                {/* Editor content */}
                <div className="flex-1 min-h-[70vh]">
                    <EditorJs
                        ref={editorRef}
                        onSave={handleDataAfterSave}
                        onChange={handleOnChange}
                        initialData={initialData}
                    />
                </div>
            </div>

            {/* Scroll buttons */}
            <div className="fixed bottom-8 right-8 lg:flex flex-col gap-3 hidden">
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

export default NotepadPage;
