const Job = ({ company, title, period, children }) => (
    <div className="mb-12 pl-10 pt-2 relative">
        <span className="absolute left-[-9px] top-[14px] flex items-center justify-center w-4 h-4 bg-indigo-600 rounded-full border-4 border-white"></span>
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/3">
                <h3 className="text-xl lg:text-2xl font-semibold text-slate-900">
                    {company}
                </h3>
                <p className="text-slate-600 text-sm lg:text-base">{title}</p>
                <p className="text-sm lg:text-base text-slate-500">{period}</p>
            </div>
            <div className="sm:w-2/3">
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                    {children}
                </ul>
            </div>
        </div>
    </div>
);

export default Job;
