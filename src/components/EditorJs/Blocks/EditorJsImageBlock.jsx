const EditorJsImageBlock = ({
    file, // { url, name, width, height, alignment }
    caption,
    withBorder,
    withBackground,
    stretched,
    maxHeight = "800px", // customizable max height
}) => {
    // Use image object width, height, alignment or fallback
    const width = file?.width || (stretched ? "100%" : "auto");
    const height = file?.height || "auto";
    const alignment = file?.alignment || "center";

    return (
        <div
            className={`
                ${withBackground ? "bg-gray-100 p-2" : ""} 
                ${withBorder ? "border border-gray-300" : ""}
            `}
        >
            <div
                className="flex w-full overflow-hidden"
                style={{
                    justifyContent:
                        alignment === "left"
                            ? "flex-start"
                            : alignment === "right"
                            ? "flex-end"
                            : "center",
                    maxHeight,
                }}
            >
                <img
                    src={file?.url}
                    alt={caption || file?.name || "editor image"}
                    className="object-contain"
                    style={{ width, height, maxHeight }}
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
