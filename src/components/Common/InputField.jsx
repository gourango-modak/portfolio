export const InputField = ({ label, name, value, onChange }) => (
	<div>
		<label
			htmlFor={name}
			className="block text-sm font-medium text-slate-700 mb-1"
		>
			{label}
		</label>
		<input
			type="text"
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
		/>
	</div>
);
