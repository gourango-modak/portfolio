export default function HeaderBlock({ text, level }) {
	const Tag = `h${level}`;
	return <Tag className="font-bold my-3 text-slate-800">{text}</Tag>;
}
