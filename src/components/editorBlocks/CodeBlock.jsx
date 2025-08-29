import { useEffect, useRef } from "react";
import Prism from "prismjs";

const CodeBlock = ({ code, language }) => {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) Prism.highlightElement(ref.current);
    }, [code, language]);

    return (
        <div className="relative my-6 rounded-lg not-prose bg-slate-800 text-gray-100">
            {/* Left accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-l-lg"></div>

            <pre
                className={`language-${language} overflow-x-auto whitespace-pre p-4 sm:p-6 rounded-lg hide-scrollbar`}
            >
                <code
                    ref={ref}
                    className={`language-${language} font-mono text-sm leading-relaxed block min-w-full`}
                >
                    {code}
                </code>
            </pre>
        </div>
    );
};

export default CodeBlock;
