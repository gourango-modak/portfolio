import { useRenderLogger } from "../../../hooks/useRenderLogger";
import {
    useActiveFrameBgColor,
    useActiveFrameId,
} from "../../../store/selectors/frameSelectors";
import { frameSlice } from "../../../store/utils";
import { ColorProperty } from "./ColorProperty";

export const FrameBgProperty = () => {
    const activeFrameId = useActiveFrameId();
    const activeFrameBgColor = useActiveFrameBgColor();

    const { setFrameBg } = frameSlice.getSlice();

    const handleChange = (_, { value }) => {
        setFrameBg(activeFrameId, value);
    };

    useRenderLogger("FrameBgProperty");

    return (
        activeFrameId && (
            <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">
                    {activeFrameBgColor.label}
                </label>
                <ColorProperty
                    property={activeFrameBgColor}
                    onChange={handleChange}
                />
            </div>
        )
    );
};
