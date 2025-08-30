import Modal from "../common/Modal";
import { downloadJson, prepareProjectData } from "../../utils/common";
import { validateProjectForm } from "../../utils/validation";
import { useProjectForm } from "../../hooks/useProjectForm";
import { ProjectForm } from "./ProjectForm";
import { getFileName } from "../../utils/common";

const initialData = {
    tagline: "",
    description: "",
    liveUrl: "",
    repoUrl: "",
    startDate: "",
    endDate: "",
    technologies: [],
};

const ProjectModal = ({ isOpen, onClose, onSave, editorData }) => {
    if (!isOpen) return null;

    const { formData, handleChange, errors, setErrors } =
        useProjectForm(initialData);

    const handleSave = () => {
        const validationErrors = validateProjectForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const projectData = prepareProjectData(editorData, formData);
        downloadJson(
            projectData,
            getFileName(projectData.title, projectData.id)
        );
        onSave();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            style={{ width: "w-2xl" }}
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
                errors={errors}
            />
        </Modal>
    );
};

export default ProjectModal;
