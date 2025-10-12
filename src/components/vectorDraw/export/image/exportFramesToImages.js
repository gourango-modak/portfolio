import { exportFrameToImage } from "./exportFrameToImage";

export const exportFramesToImages = async ({ frames, shapes, scale = 1 }) => {
    const imgDataUrls = [];
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        imgDataUrls.push(await exportFrameToImage({ frame, scale, shapes }));
    }

    return imgDataUrls;
};
