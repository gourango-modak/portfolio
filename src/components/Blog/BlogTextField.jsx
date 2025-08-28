import { useEffect, useRef } from "react";

const BlogTextField = ({
	value = "",
	onChange,
	placeholder,
	fontStyle = "",
}) => {
	const textareaRef = useRef(null);

	// Function to resize textarea
	const resizeTextarea = () => {
		if (!textareaRef.current) return;
		const textarea = textareaRef.current;
		textarea.style.height = "auto"; // reset
		textarea.style.height = `${textarea.scrollHeight}px`; // fit content
	};

	// Run on mount and whenever value changes
	useEffect(() => {
		resizeTextarea();
	}, [value]);

	return (
		<textarea
			ref={textareaRef}
			value={value}
			onChange={(e) => {
				onChange?.(e);
				resizeTextarea(); // also resize as user types
			}}
			placeholder={placeholder || "Write your text here..."}
			className={`w-full py-2 resize-none overflow-hidden focus:outline-none ${fontStyle}`}
			rows={1}
		/>
	);
};

export default BlogTextField;
