const Loader = ({ message = "Loading..." }) => (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-slate-500">{message}</span>
    </div>
);

export default Loader;
