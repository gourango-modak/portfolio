import { X } from "lucide-react";

const ModalHeader = ({ title, onClose }) => (
    <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
        >
            <X size={24} />
        </button>
    </div>
);

export default ModalHeader;
