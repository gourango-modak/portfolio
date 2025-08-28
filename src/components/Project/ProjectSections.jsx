import { Trash2 } from "lucide-react";
import { InputField } from "../common/InputField";
import { TextAreaField } from "../common/TextareaField";
import { CONFIG } from "../../config/config";

export const ProjectSections = ({ sections, onChange, onRemove }) => {
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSections = [...sections];
        updatedSections[index][name] = value;
        onChange(updatedSections);
    };

    return (
        <>
            {sections.map((section, index) => (
                <div key={index} className="relative">
                    <button
                        onClick={() => onRemove(index)}
                        className="absolute right-0 text-red-400 hover:text-red-600 cursor-pointer"
                    >
                        <Trash2 size={18} />
                    </button>
                    {section.type === CONFIG.SECTION_TYPE.INPUT && (
                        <InputField
                            label={section.title}
                            name="content"
                            value={section.content}
                            onChange={(e) => handleChange(index, e)}
                        />
                    )}
                    {section.type === CONFIG.SECTION_TYPE.TEXT && (
                        <TextAreaField
                            label={section.title}
                            name="content"
                            value={section.content}
                            onChange={(e) => handleChange(index, e)}
                        />
                    )}
                </div>
            ))}
        </>
    );
};
