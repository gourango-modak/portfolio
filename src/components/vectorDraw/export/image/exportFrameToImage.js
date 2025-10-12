import { createFrameGroup } from "./createFrameGroup";
import { exportElementToImage } from "./exportElementToImage";

export const exportFrameToImage = async ({ frame, scale = 1, shapes }) => {
    const exportG = createFrameGroup(frame, shapes);
    return await exportElementToImage({
        element: exportG,
        bbox: {
            x: frame.x.value,
            y: frame.y.value,
            width: frame.width.value,
            height: frame.height.value,
        },
        scale,
    });
};
