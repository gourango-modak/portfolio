import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-csharp";
import { Copy, Check } from "lucide-react"; // icons

const EditorJsCodeBlock = ({ code, language }) => {
    const ref = useRef();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (ref.current) {
            Prism.highlightElement(ref.current);
        }
    }, [code, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

    return (
        <div className="relative my-6 rounded-lg overflow-hidden bg-[#303030]">
            {/* Header bar (same color as code block) */}
            <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-300 font-mono">
                <span className="uppercase tracking-wide">{language}</span>
                <button
                    onClick={handleCopy}
                    className="p-1 rounded hover:bg-gray-700 transition cursor-pointer"
                    title="Copy code"
                >
                    {copied ? (
                        <Check size={16} className="text-green-400" />
                    ) : (
                        <Copy size={16} className="text-gray-300" />
                    )}
                </button>
            </div>

            {/* Code block */}
            <pre
                className={`language-${language} overflow-x-auto whitespace-pre px-6 pb-6`}
            >
                <code
                    ref={ref}
                    className={`language-${language} font-mono text-sm leading-relaxed block px-4 min-w-full`}
                >
                    {code}
                </code>
            </pre>
        </div>
    );
};

export default EditorJsCodeBlock;
