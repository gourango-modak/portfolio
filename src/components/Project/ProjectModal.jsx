import Modal from "../common/Modal";
import { downloadJson } from "../../utils/common";
import { validateProjectForm } from "../../utils/validation";
import { useProjectForm } from "../../hooks/useProjectForm";
import { ProjectForm } from "./ProjectForm";
import { generateId, getFileName } from "../../utils/common";

const initialData = {
    title: "",
    tagline: "",
    description: "",
    liveUrl: "",
    repoUrl: "",
    startDate: "",
    endDate: "",
    technologies: [],
};

const ProjectModal = ({ isOpen, onClose, onSave, projectContent }) => {
    if (!isOpen) return null;

    const { formData, handleChange, errors, setErrors } =
        useProjectForm(initialData);

    const handleSave = () => {
        const validationErrors = validateProjectForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const project = {
            id: generateId(),
            createdAt: Date.now(),
            ...formData,
            content: projectContent,
            technologies: formData.technologies.split(","),
        };
        downloadJson(project, getFileName(project.title, project.id));
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
