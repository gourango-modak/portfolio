import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // choose your theme
import { Clipboard, ClipboardCheck } from "lucide-react";

const CodeBlock = ({ code, language = "javascript" }) => {
    const codeRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [code, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // reset after 2s
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

    return (
        <div className="relative my-4 rounded-lg overflow-hidden  bg-gray-900">
            <pre className="p-10 overflow-x-auto text-base">
                <code ref={codeRef} className={`language-${language}`}>
                    {code}
                </code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 transition cursor-pointer"
            >
                {copied ? (
                    <ClipboardCheck size={18} />
                ) : (
                    <Clipboard size={18} />
                )}
            </button>
        </div>
    );
};

export default CodeBlock;
