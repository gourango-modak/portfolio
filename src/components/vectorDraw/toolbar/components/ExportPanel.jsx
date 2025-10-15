import { performExport } from "../../export/utils";
import { useRenderLogger } from "../../hooks/useRenderLogger";
import { panelSlice } from "../../store/utils";
import { ExportPanelBody } from "./ExportPanelBody";
import { PANELS } from "./../../constants";

export const ExportPanel = () => {
    const { closeExportPanel } = panelSlice.getSlice();

    const handleExport = (options) => {
        performExport(options);
    };

    useRenderLogger("ExportPanel");

    return (
        <div
            className="w-72 shadow-md bg-white rounded-md border border-gray-300 flex-col flex noselect"
            id={PANELS.EXPORT_PANEL}
        >
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 cursor-grab active:cursor-grabbing select-none drag-handle">
                <h2 className="text-sm font-medium text-gray-800 truncate">
                    Export
                </h2>
                <button
                    className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full cursor-pointer close-btn"
                    onClick={closeExportPanel}
                    aria-label="Close Properties Panel"
                >
                    ✕
                </button>
            </div>
            <ExportPanelBody onExport={handleExport} />
        </div>
    );
};
