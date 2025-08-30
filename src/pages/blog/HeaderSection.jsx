import AddContentButton from "../../components/common/AddContentButton";

const HeaderSection = ({ onAddClick }) => {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-slate-900">
                    My Writings
                </h1>
                <AddContentButton onClick={onAddClick} />
            </div>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                Here I share my thoughts on software development, .NET, and the
                tech world.
            </p>
        </>
    );
};

export default HeaderSection;
