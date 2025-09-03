const EditorJsParagraphBlock = ({ text, isFirstBlock }) => {
    return (
        <p
            className={`text-slate-600 leading-relaxed mb-6 text-base sm:text-lg ${
                isFirstBlock ? "mt-8" : ""
            }`}
            dangerouslySetInnerHTML={{
                __html: text.replace(
                    /<code>(.*?)<\/code>/g,
                    `<code class="font-mono text-sm leading-relaxed bg-slate-200 text-slate-800 rounded px-1 py-0.5">${"$1"}</code>`
                ),
            }}
        />
    );
};

export default EditorJsParagraphBlock;
