import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import CodeBlock from "./CodeBlock";

const MarkdownRenderer = ({ content }) => {
	return (
		<ReactMarkdown
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");

					return !inline && match ? (
						<CodeBlock
							language={match[1]}
							value={String(children).replace(/\n$/, "")}
						/>
					) : (
						<code
							{...props}
							className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm"
						>
							{children}
						</code>
					);
				},
				// return the children instead of wrapping the children with `<pre></pre>`
				pre({ children }) {
					return (
						<div className="border-1 rounded-2xl border-gray-300 dark:border-0">
							{children}
						</div>
					);
				},
				p({ children }) {
					return <p className="">{children}</p>;
				},
			}}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
		>
			{content}
		</ReactMarkdown>
	);
};

export default MarkdownRenderer;
