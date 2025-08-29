export default function ParagraphBlock({ text, emptyHeight = 18 }) {
    const isEmpty = !text || !text.trim();

    return isEmpty ? (
        <div style={{ height: `${emptyHeight}px` }} />
    ) : (
        <p
            className="text-slate-600"
            dangerouslySetInnerHTML={{ __html: text }}
        />
    );
}
