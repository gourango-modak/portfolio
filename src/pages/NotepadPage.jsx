import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import EditorJs from "../components/editorJs/EditorJs";
import {
    CUSTOM_TOOLS,
    EDITOR_JS_INITIALDATA,
    getEditorJsTools,
} from "../components/editorJs/config";
import { useAlert } from "../context/AlertProvider";
import { downloadFile } from "../utils/common";

const NotepadPage = () => {
    const editorRef = useRef(null);
    const { showAlert } = useAlert();
    const [initialData, setInitialData] = useState(EDITOR_JS_INITIALDATA);
    const NOTE_STORE_KEY = "gm-notes";

    const extractTextFromEditorData = (content) => {
        if (!content?.blocks?.length) return { title: "note", textContent: "" };

        let lines = [];
        let title = "note";

        content.blocks.forEach((block) => {
            switch (block.type) {
                case CUSTOM_TOOLS.TITLE.TYPE:
                    // Main title
                    title = block.data.text?.trim() || "note";
                    lines.push(`# ${title}`);
                    lines.push(""); // newline after title
                    break;

                case "header":
                    // Section headers
                    const level = block.data.level || 2;
                    lines.push(
                        `${"#".repeat(level)} ${block.data.text?.trim() || ""}`
                    );
                    lines.push(""); // newline after header
                    break;

                case "paragraph":
                    const text = block.data.text ?? "";
                    lines.push(text);
                    lines.push(""); // preserve intentional spacing
                    break;

                case "list":
                    const { style, items } = block.data;

                    if (style === "checklist") {
                        // Checklist format
                        const checklistLines =
                            items
                                ?.map(
                                    (item) =>
                                        `[${item.meta?.checked ? "x" : " "}] ${
                                            item.content || item.text || ""
                                        }`
                                )
                                .join("\n") || "";
                        lines.push(checklistLines);
                    } else {
                        // Ordered/unordered lists
                        const listLines =
                            items
                                ?.map(
                                    (item, idx) =>
                                        `${
                                            style === "ordered"
                                                ? `${idx + 1}.`
                                                : "-"
                                        } ${item.content || item.text || item}`
                                )
                                .join("\n") || "";
                        lines.push(listLines);
                    }

                    lines.push(""); // newline after list
                    break;

                default:
                    break;
            }
        });

        // Remove possible consecutive empty lines
        const textContent = lines
            .map((l) => l.replace(/\r\n/g, "\n"))
            .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
            .join("\n");

        return { title, textContent };
    };

    const handleDataAfterSave = ({ content, options }) => {
        if (options?.download) {
            const { title, textContent } = extractTextFromEditorData(content);
            const blob = new Blob([textContent], { type: "text/plain" });
            downloadFile(blob, `${title}.txt`);
        } else {
            localStorage.setItem(NOTE_STORE_KEY, JSON.stringify(content));
        }
    };

    const handleOnChange = async (options) => {
        if (editorRef.current) {
            await editorRef.current.save(options);
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

    const clearNotes = () => {
        localStorage.removeItem(NOTE_STORE_KEY);
    };

    const loadNotes = (data) => {
        setInitialData(JSON.parse(data));
    };

    useEffect(() => {
        const noteData = localStorage.getItem(NOTE_STORE_KEY);
        if (noteData) {
            showAlert("Would you like to continue from where you left off?", {
                type: "info",
                buttons: [
                    {
                        label: "Cancel",
                        type: "secondary",
                        onClick: () => clearNotes,
                    },
                    {
                        label: "Okay",
                        type: "primary",
                        onClick: () => loadNotes(noteData),
                    },
                ],
            });
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = async (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();
                handleOnChange({ download: true });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="max-w-7xl mx-auto lg:px-4 pt-2 relative">
            <div className="bg-white px-6 md:pr-21 flex flex-col">
                <div className="flex-1 min-h-[70vh]">
                    <EditorJs
                        ref={editorRef}
                        onSave={handleDataAfterSave}
                        onChange={handleOnChange}
                        initialData={initialData}
                        tools={getEditorJsTools()}
                    />
                </div>
            </div>
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
        </div>
    );
};

export default NotepadPage;
