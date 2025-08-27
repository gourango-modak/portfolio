import { useEffect, useRef } from "react";

const BlogTitle = (props) => {
	// Create a ref to hold the textarea DOM element
	const textareaRef = useRef(null);

	// This effect runs whenever the `value` prop changes
	useEffect(() => {
		if (textareaRef.current) {
			// Temporarily set height to 'auto' to get the correct scrollHeight
			textareaRef.current.style.height = "auto";
			// Set the height to the scrollHeight to fit the content
			const scrollHeight = textareaRef.current.scrollHeight;
			textareaRef.current.style.height = `${scrollHeight}px`;
		}
	}, [props.value]); // Dependency array ensures this runs only when the value changes

	return (
		<textarea
			ref={textareaRef}
			{...props}
			className="w-full pt-4 pb-4 resize-none overflow-hidden no-focus text-2xl font-bold"
			rows={1} // Start with a single row, the JS will handle the rest
		/>
	);
};

export default BlogTitle;
