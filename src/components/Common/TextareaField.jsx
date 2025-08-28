export const TextAreaField = ({ label, name, value, onChange }) => (
    <div>
        <label
            htmlFor={name}
            className="block text-sm font-medium text-slate-700 mb-1"
        >
            {label}
        </label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
    </div>
);
