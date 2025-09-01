const EditorJsParagraphBlock = ({ text }) => {
    return (
        <p
            className="text-slate-600 leading-relaxed mb-6 text-base sm:text-lg"
            dangerouslySetInnerHTML={{ __html: text }}
        />
    );
};

export default EditorJsParagraphBlock;
