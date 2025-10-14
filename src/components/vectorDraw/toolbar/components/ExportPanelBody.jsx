import { useEffect, useState } from "react";
import { Image, FileText, File } from "lucide-react";
import {
    EXPORT_FORMAT,
    EXPORT_SCALE,
    EXPORT_SCOPE,
    EXPORT_SELECT_FORMAT_OPTIONS,
    EXPORT_SELECT_SCALE_OPTIONS,
    EXPORT_SELECT_SCOPE_OPTIONS,
} from "../../export/constants";
import { useCanvasMode } from "../../store/selectors/canvasPropertiesSelectors";
import { CANVAS_MODES } from "../../constants";
import { useActiveFrameId } from "./../../store/selectors/frameSelectors";

export const ExportPanelBody = ({ onExport }) => {
    const canvasMode = useCanvasMode();
    const activeFrameId = useActiveFrameId();
    const [format, setFormat] = useState(EXPORT_FORMAT.PNG);
    const [scale, setScale] = useState(EXPORT_SCALE.ONE_X);
    const [background, setBackground] = useState(true);
    const [scope, setScope] = useState(null);

    useEffect(() => {
        setScope(
            canvasMode === CANVAS_MODES.PAGED && activeFrameId
                ? EXPORT_SCOPE.CURRENT_PAGE
                : EXPORT_SCOPE.ENTIRE_CANVAS
        );
    }, [canvasMode, activeFrameId]);

    const handleExport = () => {
        onExport({ scope, format, scale, background });
    };

    // filter only current mode options and
    // keep infinite mode options if there is no page yet
    const scopeOptions = Object.values(EXPORT_SELECT_SCOPE_OPTIONS).filter(
        (o) =>
            (o.mode === CANVAS_MODES.PAGED && activeFrameId !== null) ||
            (o.mode === CANVAS_MODES.INFINITE && activeFrameId === null)
    );

    return (
        <div className="p-4 space-y-4 w-72 text-[12px] text-gray-500 tracking-wide">
            {/* Step 1: Scope */}
            <fieldset className="border border-gray-300 rounded-lg p-4">
                <legend className="text-gray-500 font-medium uppercase">
                    Select Scope
                </legend>
                <div className="flex flex-col gap-2 mt-2">
                    {Object.values(scopeOptions).map((opt) => {
                        return (
                            <label
                                key={opt.value}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="radio"
                                    name="scope"
                                    value={opt.value}
                                    checked={scope === opt.value}
                                    onChange={() => setScope(opt.value)}
                                />
                                {opt.label}
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            {/* Step 2: Format */}
            <fieldset className="border border-gray-300 rounded-lg p-4">
                <legend className="text-gray-500 font-medium uppercase">
                    Select Format
                </legend>
                <div className="flex flex-col mt-2 gap-2">
                    {Object.values(EXPORT_SELECT_FORMAT_OPTIONS).map((opt) => {
                        // Show JSON only for entire document
                        if (
                            opt.value === EXPORT_FORMAT.JSON &&
                            scope !== EXPORT_SCOPE.ENTIRE_CANVAS
                        )
                            return null;

                        // Determine icon
                        let Icon;
                        if (opt.value === EXPORT_FORMAT.PNG) Icon = Image;
                        else if (opt.value === EXPORT_FORMAT.PDF)
                            Icon = FileText;
                        else Icon = File;

                        return (
                            <label
                                key={opt.value}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="radio"
                                    name="format"
                                    value={opt.value}
                                    checked={format === opt.value}
                                    onChange={() => setFormat(opt.value)}
                                />
                                <Icon className="w-4 h-4" /> {opt.label}
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            {/* Step 3: Scale */}
            {format !== EXPORT_FORMAT.JSON && (
                <fieldset className="border border-gray-300 rounded-lg p-4">
                    <legend className="text-gray-500 font-medium uppercase">
                        Select Scale
                    </legend>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {Object.values(EXPORT_SELECT_SCALE_OPTIONS).map(
                            (option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center gap-1"
                                >
                                    <input
                                        type="radio"
                                        name="scale"
                                        value={option.value}
                                        checked={scale === option.value}
                                        onChange={() => setScale(option.value)}
                                    />
                                    {option.label}
                                </label>
                            )
                        )}
                    </div>
                </fieldset>
            )}

            {/* Step 4: Background Toggle */}
            {canvasMode === CANVAS_MODES.INFINITE &&
                format !== EXPORT_FORMAT.JSON && (
                    <div className="flex items-center justify-between mt-2 uppercase">
                        <span>Background</span>
                        <button
                            type="button"
                            onClick={() => setBackground(!background)}
                            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                                background ? "bg-indigo-600" : "bg-gray-300"
                            }`}
                        >
                            <div
                                className={`bg-white w-3 h-3 rounded-full shadow transform transition-transform ${
                                    background
                                        ? "translate-x-5"
                                        : "translate-x-0"
                                }`}
                            />
                        </button>
                    </div>
                )}

            {/* Step 5: Export Button */}
            <button
                onClick={handleExport}
                className="w-full text-[14px] px-4 py-2 mt-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 cursor-pointer uppercase"
            >
                Export
            </button>
        </div>
    );
};
