import { createFrameGroup } from "./createFrameGroup";
import { exportElementToImage } from "./exportElementToImage";

export const exportFrameToImage = async ({
    frame,
    scale = 1,
    shapes,
    background = false,
}) => {
    const exportG = createFrameGroup(frame, shapes);
    return await exportElementToImage({
        element: exportG,
        bbox: {
            x: frame.x,
            y: frame.y,
            width: frame.width,
            height: frame.height,
        },
        scale,
        background,
    });
};
