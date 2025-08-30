const EditorJsParagraphBlock = ({ text }) => {
    return (
        <p
            className="text-slate-600"
            dangerouslySetInnerHTML={{ __html: text }}
        />
    );
};
export default EditorJsParagraphBlock;
