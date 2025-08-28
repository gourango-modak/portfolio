import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	footer,
	position = "top",
}) => {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}

		// cleanup on unmount
		return () => document.body.classList.remove("no-scroll");
	}, [isOpen]);

	if (!isOpen) return null;

	const alignmentClass =
		position === "center" ? "flex justify-center items-center" : "";

	return (
		<div
			className={`fixed inset-0 bg-black/60 z-50 p-4 overflow-auto hide-scrollbar ${alignmentClass}`}
		>
			<div className="flex items-center justify-center">
				<div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl">
					{/* Modal Header */}
					<div className="p-6 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
						<h2 className="text-2xl font-bold text-slate-800 pr-12">
							{title}
						</h2>
						<button
							onClick={onClose}
							className="text-slate-400 hover:text-slate-600 cursor-pointer"
						>
							<X size={24} />
						</button>
					</div>

					{/* Modal Body (Scrollable) */}
					<div className="p-6 space-y-4 overflow-y-auto">
						{children}
					</div>

					{/* Modal Footer */}
					<div className="p-6 border-t border-gray-200 flex justify-end gap-4 rounded-b-lg flex-shrink-0">
						{footer}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
