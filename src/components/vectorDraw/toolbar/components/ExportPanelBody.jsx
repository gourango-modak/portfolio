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
import {
    useActiveFrameId,
    useSelectedFrameIds,
} from "./../../store/selectors/frameSelectors";
import { useSelectedShapeIds } from "../../store/selectors/shapeSelectors";

export const ExportPanelBody = ({ onExport }) => {
    const canvasMode = useCanvasMode();
    const activeFrameId = useActiveFrameId();
    const selectedShapeIds = useSelectedShapeIds();
    const selectedFrameIds = useSelectedFrameIds();
    const [format, setFormat] = useState(EXPORT_FORMAT.PNG);
    const [scale, setScale] = useState(EXPORT_SCALE.ONE_X);
    const [background, setBackground] = useState(true);
    const [onlySelected, setOnlySelected] = useState(false);
    const [scope, setScope] = useState(null);
    const [padding, setPadding] = useState(20);

    useEffect(() => {
        setScope(
            canvasMode === CANVAS_MODES.PAGED && activeFrameId
                ? EXPORT_SCOPE.CURRENT_PAGE
                : EXPORT_SCOPE.ENTIRE_CANVAS
        );
    }, [canvasMode, activeFrameId]);

    const handleExport = () => {
        onExport({ scope, format, scale, background, onlySelected, padding });
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
                <div className="flex items-center justify-between text-gray-500 font-medium uppercase mb-4">
                    <span>Select Scale</span>
                    <div className="flex items-center gap-2">
                        {Object.values(EXPORT_SELECT_SCALE_OPTIONS).map(
                            (option) => {
                                const isSelected = scale === option.value;
                                const size = 20 + option.value * 2; // example: 1x -> 30px, 2x -> 40px, 3x -> 50px

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setScale(option.value)}
                                        style={{
                                            width: size,
                                            height: size,
                                        }}
                                        className={`flex items-center justify-center text-xs rounded-md cursor-pointer font-medium transition-colors ${
                                            isSelected
                                                ? "bg-indigo-600 text-white"
                                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                );
                            }
                        )}
                    </div>
                </div>
            )}

            {/* Step 4: Only Selected Toggle */}
            {(selectedFrameIds.size > 0 || selectedShapeIds.size > 0) && (
                <div className="flex items-center justify-between uppercase font-medium mb-4">
                    <span>Only Selected</span>
                    <button
                        type="button"
                        onClick={() => setOnlySelected(!onlySelected)}
                        className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                            onlySelected ? "bg-indigo-600" : "bg-gray-300"
                        }`}
                    >
                        <div
                            className={`bg-white w-3 h-3 rounded-full shadow transform transition-transform ${
                                onlySelected ? "translate-x-5" : "translate-x-0"
                            }`}
                        />
                    </button>
                </div>
            )}

            {/* Step 5: Background Toggle */}
            {canvasMode === CANVAS_MODES.INFINITE &&
                format !== EXPORT_FORMAT.JSON && (
                    <div className="flex items-center justify-between font-medium uppercase mb-4">
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

            {/* Step 6: Padding */}
            {(canvasMode === CANVAS_MODES.INFINITE ||
                (canvasMode === CANVAS_MODES.PAGED &&
                    activeFrameId === null)) && (
                <div className="">
                    <label className="flex items-center justify-between text-gray-500 font-medium uppercase mb-2">
                        <span>Padding</span>
                        <input
                            type="number"
                            min={0}
                            value={padding}
                            onChange={(e) => setPadding(Number(e.target.value))}
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </label>
                </div>
            )}

            {/* Step 7: Export Button */}
            <button
                onClick={handleExport}
                className="w-full text-[14px] px-4 py-2 mt-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 cursor-pointer uppercase"
            >
                Export
            </button>
        </div>
    );
};
