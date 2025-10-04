import { useState } from "react";
import { useCanvasStore } from "../../store/useCanvasStore";
import { ColorProperty } from "./ColorProperty";
import { useRenderLogger } from "../../hooks/useRenderLogger";

export const PageProperties = () => {
    const frameTemplate = useCanvasStore((s) => s.frameTemplate);
    const updateFrameTemplate = useCanvasStore((s) => s.updateFrameTemplate);
    const [properties, setProperties] = useState({
        width: frameTemplate.width,
        height: frameTemplate.height,
        bgColor: frameTemplate.bgColor,
    });

    const handleChange = ({ name, value }) => {
        setProperties((state) => ({ ...state, [name]: value }));
        console.log(name, value);
        updateFrameTemplate({ [name]: value });
    };

    useRenderLogger("PageSettingsPanel");

    return (
        <div className="flex flex-col gap-4 p-4 text-sm text-gray-800">
            <div className="space-y-4">
                {/* Width */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Width
                    </label>
                    <input
                        type="number"
                        value={properties.width}
                        onChange={(e) =>
                            handleChange({
                                name: "width",
                                value: Number(e.target.value),
                            })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                </div>

                {/* Height */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Height
                    </label>
                    <input
                        type="number"
                        value={properties.height}
                        onChange={(e) =>
                            handleChange({
                                name: "height",
                                value: Number(e.target.value),
                            })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                </div>

                {/* Background Color */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Background Color
                    </label>
                    <ColorProperty
                        propertyName="bgColor"
                        value={properties.bgColor}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};
