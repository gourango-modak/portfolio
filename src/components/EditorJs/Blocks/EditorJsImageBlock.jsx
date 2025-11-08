import { extractOriginalFileName } from "../utils";

const EditorJsImageBlock = ({
    url,
    name,
    width,
    alignment = "center",
    isFirstBlock,
}) => {
    // Convert alignment prop to CSS justifyContent
    const justifyContent =
        alignment === "left"
            ? "flex-start"
            : alignment === "right"
            ? "flex-end"
            : "center";

    return (
        <div
            className={`flex w-full overflow-hidden mb-6 ${
                isFirstBlock ? "mt-6" : ""
            }`}
            style={{ justifyContent }}
        >
            <img
                src={url}
                alt={extractOriginalFileName(name)}
                className="object-contain"
                style={{ width, height: "auto" }}
            />
        </div>
    );
};

export default EditorJsImageBlock;
