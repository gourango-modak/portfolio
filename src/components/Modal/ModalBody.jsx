const ModalBody = ({ children, padding, minHeight }) => (
    <div className={`${padding} ${minHeight} overflow-y-auto`}>{children}</div>
);

export default ModalBody;
