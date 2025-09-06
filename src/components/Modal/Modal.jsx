import { useEffect } from "react";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

// Keep a global counter of open modals
let openModalCount = 0;
const defaultStyle = {
    position: "top",
    width: "w-6xl",
    padding: "p-6",
    minHeight: "",
};

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    style = {},
    showCloseBtn = true,
}) => {
    const mergedStyle = { ...defaultStyle, ...style };

    // Manage body scroll based on open modals
    useEffect(() => {
        if (isOpen) {
            openModalCount += 1;
            document.body.classList.add("no-scroll");
        }

        return () => {
            if (isOpen && openModalCount > 0) {
                openModalCount -= 1;
                if (openModalCount === 0) {
                    document.body.classList.remove("no-scroll");
                }
            }
        };
    }, [isOpen]);

    // Early return only for rendering, hooks are safe
    if (!isOpen) return null;

    const alignmentClass =
        mergedStyle.position === "center"
            ? "flex justify-center items-center"
            : "";

    return (
        <div
            className={`fixed inset-0 bg-black/60 z-50 p-4 overflow-auto hide-scrollbar ${alignmentClass} ${
                isOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <div className="flex items-center justify-center">
                <div
                    className={`bg-white rounded-lg shadow-2xl ${mergedStyle.width}`}
                >
                    {title && (
                        <ModalHeader
                            title={title}
                            onClose={onClose}
                            showCloseBtn={showCloseBtn}
                        />
                    )}

                    <ModalBody
                        padding={mergedStyle.padding}
                        minHeight={mergedStyle.minHeight}
                    >
                        {children}
                    </ModalBody>

                    <ModalFooter footer={footer} />
                </div>
            </div>
        </div>
    );
};

export default Modal;
