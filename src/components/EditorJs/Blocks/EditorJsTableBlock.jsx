const EditorJsTableBlock = ({ content }) => {
    if (!Array.isArray(content)) return null;
    const rows = content;
    return (
        <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-slate-300 border-collapse text-slate-700">
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`${
                                rowIndex === 0
                                    ? "bg-slate-100 font-semibold"
                                    : ""
                            }`}
                        >
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="border border-slate-300 px-4 py-2 text-base sm:text-lg"
                                    dangerouslySetInnerHTML={{ __html: cell }}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EditorJsTableBlock;
