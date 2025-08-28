export default function ImageBlock({
	file,
	caption,
	withBorder,
	withBackground,
	stretched,
}) {
	return (
		<div
			className={`my-4 ${stretched ? "w-full" : "max-w-lg"} ${
				withBackground ? "bg-gray-100 p-2" : ""
			} ${withBorder ? "border border-gray-300" : ""}`}
		>
			<img
				src={file?.url}
				alt={caption || "editor image"}
				className="mx-auto"
			/>
			{caption && (
				<p className="text-sm text-center text-gray-500 mt-1">
					{caption}
				</p>
			)}
		</div>
	);
}
