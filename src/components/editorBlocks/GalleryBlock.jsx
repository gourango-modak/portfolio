import { useState } from "react";

const GalleryBlock = ({ images: galleryImages }) => {
    const [images] = useState(galleryImages || []);

    if (!images.length) return null;

    return (
        <div className="gallery-block py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((imgData, index) => (
                    <div
                        key={index}
                        className="relative w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden group"
                    >
                        {imgData.url ? (
                            <img
                                src={imgData.url}
                                alt={
                                    imgData.caption ||
                                    `Gallery Image ${index + 1}`
                                }
                                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                            />
                        ) : (
                            <div className="text-gray-400 text-center">
                                No Image
                            </div>
                        )}
                        {imgData.caption && (
                            <div className="absolute bottom-0 w-full bg-black/50 text-white text-sm p-1 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                {imgData.caption}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryBlock;
