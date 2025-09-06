import { useState } from "react";
import { downloadJson, getContentFileName } from "../utils/common";

export const useContentEditor = (prepareDataFn) => {
    const [isEditorJsModalOpen, setEditorJsModalOpen] = useState(false);
    const [isMetaDataModalOpen, setMetaDataModalOpen] = useState(false);
    const [editorJsData, setEditorJsData] = useState(null);
    const [metaData, setMetaData] = useState(null);

    const openEditorJsModal = (data = null) => {
        setEditorJsModalOpen(true);
        setEditorJsData(data);
        setMetaData(null);
    };

    const closeEditorJsModal = () => {
        setEditorJsModalOpen(false);
        setEditorJsData(null);
        setMetaData(null);
    };

    const saveEditorJsData = (data) => {
        setEditorJsData(data);
        setEditorJsModalOpen(false);
        setMetaDataModalOpen(true);
    };

    const closeMetaDataModal = () => {
        setMetaDataModalOpen(false);
        setEditorJsModalOpen(false);
        setEditorJsData(null);
        setMetaData(null);
    };

    const saveMetaData = (meta) => {
        if (!prepareDataFn) {
            console.error("No prepareData function provided!");
            return;
        }

        const finalData = prepareDataFn(editorJsData, meta);
        downloadJson(
            finalData,
            getContentFileName(finalData.title, finalData.id)
        );

        setEditorJsData(null);
        setMetaData(null);
        setMetaDataModalOpen(false);
    };

    const backToEditorJsModal = (meta) => {
        setMetaData(meta);
        setMetaDataModalOpen(false);
        setEditorJsModalOpen(true);
    };

    return {
        isEditorJsModalOpen,
        isMetaDataModalOpen,
        editorJsData,
        metaData,
        openEditorJsModal,
        closeEditorJsModal,
        saveEditorJsData,
        closeMetaDataModal,
        saveMetaData,
        backToEditorJsModal,
        setMetaData,
    };
};
