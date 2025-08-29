export const InputField = ({
    label,
    name,
    value,
    onChange,
    required = false,
    error,
}) => (
    <div className="mb-4">
        <label
            htmlFor={name}
            className="block text-sm font-medium text-slate-700 mb-1"
        >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);
