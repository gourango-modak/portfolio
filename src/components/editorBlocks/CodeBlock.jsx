import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";

const CodeBlock = ({ code, language }) => {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            Prism.highlightElement(ref.current);
        }
    }, [code, language]);

    return (
        <div className="relative my-6 not-prose">
            {/* Left accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600/80 rounded-l-lg"></div>

            <pre
                className={`language-${language} overflow-x-auto whitespace-pre p-6 rounded-lg hide-scrollbar`}
            >
                <code
                    ref={ref}
                    className={`language-${language} font-mono text-sm leading-relaxed block min-w-full py-8 px-4`}
                >
                    {code}
                </code>
            </pre>
        </div>
    );
};

export default CodeBlock;
