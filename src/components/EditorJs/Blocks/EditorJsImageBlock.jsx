const EditorJsImageBlock = ({
    file,
    caption,
    withBorder,
    withBackground,
    stretched,
    maxHeight = "800px", // customizable max height
}) => {
    return (
        <div
            className={`
                ${stretched ? "w-full" : ""} 
                ${withBackground ? "bg-gray-100 p-2" : ""} 
                ${withBorder ? "border border-gray-300" : ""}
            `}
        >
            <div
                className="flex justify-center items-center w-full overflow-hidden"
                style={{ maxHeight }}
            >
                <img
                    src={file?.url}
                    alt={caption || "editor image"}
                    className="w-full h-auto object-contain"
                    style={{ maxHeight }}
                />
            </div>
            {caption && (
                <p className="text-sm text-center text-gray-500 mt-1">
                    {caption}
                </p>
            )}
        </div>
    );
};

export default EditorJsImageBlock;
