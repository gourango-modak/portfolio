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
		<div className="relative">
			<button
				onClick={copyToClipboard}
				className="absolute top-4 right-4 text-black dark:text-white opacity-70 hover:opacity-100 transition cursor-pointer"
				aria-label="Copy code"
			>
				{copied ? <Check size={18} /> : <Clipboard size={18} />}
			</button>
			<SyntaxHighlighter
				style={darkMode ? atomOneDark : atomOneLight}
				language={language}
				PreTag={"div"}
				customStyle={{
					padding: "1.5rem", // customize padding as you want
					borderRadius: "16px",
				}}
				wrapLongLines
			>
				{value}
			</SyntaxHighlighter>
		</div>
	);
};

export default CodeBlock;
