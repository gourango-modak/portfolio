const ModalFooter = ({ footer }) =>
    footer ? (
        <div className="p-6 border-t border-gray-200 flex justify-end gap-4 rounded-b-lg flex-shrink-0">
            {footer}
        </div>
    ) : null;

export default ModalFooter;
