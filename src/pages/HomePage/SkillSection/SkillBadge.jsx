const SkillBadge = ({ name, proficiency, experience, iconClass }) => {
    const tooltipDetails = [
        { title: "Proficiency", value: proficiency },
        { title: "Experience", value: experience },
    ];

    return (
        <div className="group relative inline-flex w-max">
            <div className="relative z-10 flex items-center">
                <div className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-4 py-2 rounded-md text-base font-medium cursor-default transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md flex items-center gap-x-2.5">
                    {iconClass && <i className={`${iconClass} text-xl`}></i>}
                    <span>{name}</span>
                </div>
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 z-20 pointer-events-none">
                <div
                    className="relative bg-indigo-200 text-indigo-900 text-base rounded-lg py-2 px-3
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     whitespace-normal break-words min-w-max max-w-xs text-center top-[-8px]"
                >
                    {tooltipDetails.map((detail, index) => (
                        <div key={index}>
                            <span className="font-medium">{detail.title}:</span>{" "}
                            {detail.value}
                        </div>
                    ))}
                    <svg
                        className="absolute h-2 w-4 left-1/2 -translate-x-1/2 top-full text-indigo-200"
                        viewBox="0 0 16 8"
                    >
                        <polygon
                            points="0,0 8,8 16,0"
                            className="fill-current"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SkillBadge;
