import { useState } from "react";
import EditorJsModal from "../EditorJs/Modal";
import ProjectMetaDataModal from "./MetaDataModal";
import { CONTENT_TYPES } from "../../config";

const ProjectModal = ({ isOpen, setIsOpen, onClose, initialData = {} }) => {
    const [isProjectMetaDataModalOpen, setIsProjectMetaDataModalOpen] =
        useState(false);
    const [projectData, setProjectData] = useState(initialData);

    const handleEditorJsModalSave = (data) => {
        setProjectData({ ...initialData, content: data });
        onClose();
        setIsProjectMetaDataModalOpen(true);
    };

    const handleProjectMetaDataModalClose = () => {
        setIsProjectMetaDataModalOpen(false);
        setIsOpen(true);
    };

    const handleProjectMetaDataModalSave = () => {
        setIsProjectMetaDataModalOpen(false);
        setIsOpen(false);
        setProjectData(null);
    };

    const handleEditorJsModalClose = () => {
        setProjectData(null);
        onClose();
    };

    return (
        <>
            {projectData && (
                <>
                    <EditorJsModal
                        isOpen={isOpen}
                        onClose={handleEditorJsModalClose}
                        onSave={handleEditorJsModalSave}
                        initialData={projectData.content}
                        actionBtnTitle="Next"
                        contentType={CONTENT_TYPES.PROJECT}
                    />
                    <ProjectMetaDataModal
                        isOpen={isProjectMetaDataModalOpen}
                        onClose={handleProjectMetaDataModalClose}
                        onSave={handleProjectMetaDataModalSave}
                        initialData={projectData}
                    />
                </>
            )}
        </>
    );
};

export default ProjectModal;
