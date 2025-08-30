import { PlusCircle } from "lucide-react";
import { IS_DEVENV } from "../../config";

const AddContentButton = ({ onClick }) => {
    // if (!IS_DEVENV) return null;

    return (
        <button
            onClick={onClick}
            className="bg-indigo-600 text-white font-semibold p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
            <PlusCircle size={20} />
        </button>
    );
};

export default AddContentButton;
