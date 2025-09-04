const EditorJsParagraphBlock = ({ text, isFirstBlock }) => {
    return (
        <p
            className={`text-slate-600 leading-relaxed mb-6 text-base sm:text-lg ${
                isFirstBlock ? "mt-8" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: text }}
        />
    );
};

export default EditorJsParagraphBlock;
