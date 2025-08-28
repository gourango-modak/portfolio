export default function ParagraphBlock({ text }) {
	return (
		<p
			className="my-2 leading-relaxed text-slate-600"
			dangerouslySetInnerHTML={{ __html: text }}
		/>
	);
}
