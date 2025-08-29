import { useState } from "react";
import { AddSectionModal } from "./AddSectionModal";
import Modal from "../common/Modal";
import { downloadJson } from "../../utils/downloadJson";
import { validateProjectForm } from "../../utils/validateForms";
import { formatProjectData } from "../../utils/formatProjectData";
import { useProjectForm } from "../../hooks/useProjectForm";
import { ProjectForm } from "./ProjectForm";

const initialData = {
    title: "",
    tagline: "",
    keyFeatures: "",
    technologies: "",
    image: "",
    liveUrl: "",
    repoUrl: "",
    startDate: "",
    endDate: "",
    sections: [],
};

const ProjectModal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    const {
        formData,
        handleChange,
        errors,
        setErrors,
        handleSectionChange,
        addSection,
        removeSection,
    } = useProjectForm(initialData);

    const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);

    const handleAddSection = (section) => {
        addSection(section);
        setIsAddSectionModalOpen(false);
    };

    const handleSave = () => {
        const validationErrors = validateProjectForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newProject = formatProjectData(formData);
        downloadJson(
            newProject,
            `${newProject.title.toLowerCase().replace(/\s+/g, "-")}.json`
        );
        onClose();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Create New Project"
                footer={
                    <>
                        <button
                            onClick={onClose}
                            className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-700"
                        >
                            Download JSON
                        </button>
                    </>
                }
            >
                <ProjectForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSectionChange={handleSectionChange}
                    removeSection={removeSection}
                    openAddSectionModal={() => setIsAddSectionModalOpen(true)}
                    errors={errors}
                />
            </Modal>

            <AddSectionModal
                isOpen={isAddSectionModalOpen}
                onClose={() => setIsAddSectionModalOpen(false)}
                onAdd={handleAddSection}
            />
        </>
    );
};

export default ProjectModal;
