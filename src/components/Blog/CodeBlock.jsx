import { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Clipboard, Check } from "lucide-react";

const CodeBlock = ({ language, value }) => {
	const { darkMode } = useDarkMode();
	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(value).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 700);
		});
	};

	return (
		<div style={{ position: "relative" }}>
			<button
				onClick={copyToClipboard}
				className="absolute top-2 right-2 text-black dark:text-white opacity-70 hover:opacity-100 transition cursor-pointer"
				aria-label="Copy code"
			>
				{copied ? <Check size={18} /> : <Clipboard size={18} />}
			</button>
			<SyntaxHighlighter
				style={darkMode ? atomOneDark : atomOneLight}
				language={language}
				PreTag={"div"}
				showLineNumbers
				wrapLongLines
			>
				{value}
			</SyntaxHighlighter>
		</div>
	);
};

export default CodeBlock;
