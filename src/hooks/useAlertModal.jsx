import { useState } from "react";
import Modal from "../components/common/Modal";

export const useAlertModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const showAlert = (msg) => {
        setMessage(msg);
        setIsOpen(true);
    };

    const closeAlert = () => setIsOpen(false);

    const AlertModal = () =>
        isOpen ? (
            <Modal
                isOpen={isOpen}
                onClose={closeAlert}
                title="Warning"
                style={{ width: "w-md" }}
                showHeader={true}
                footer={
                    <button
                        onClick={closeAlert}
                        className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 cursor-pointer"
                    >
                        OK
                    </button>
                }
            >
                <p className="text-red-600 font-medium">{message}</p>
            </Modal>
        ) : null;

    return { showAlert, AlertModal };
};
