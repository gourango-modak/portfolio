const SectionHeader = ({ title, text }) => (
    <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-900">
            {title}
        </h2>
        {text && <p className="max-w-xl mx-auto text-gray-700">{text}</p>}
    </div>
);

export default SectionHeader;
