export default function ListBlock({ style, items }) {
	const ListTag = style === "ordered" ? "ol" : "ul";
	return (
		<ListTag className="list-inside my-2 ml-4 marker:text-slate-500">
			{items.map((item, i) => (
				<li key={i}>{item.content}</li>
			))}
		</ListTag>
	);
}
