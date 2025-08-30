const EditorJsHeaderBlock = ({ text, level }) => {
    const Tag = `h${level}`;
    return <Tag className="text-slate-800">{text}</Tag>;
};

export default EditorJsHeaderBlock;
