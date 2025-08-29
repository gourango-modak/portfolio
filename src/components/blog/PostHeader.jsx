import profile from "../../assets/gm_150x150.png";

const PostHeader = ({ title, date }) => {
    return (
        <div className="border-b pb-7 border-gray-300">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                {title}
            </h1>

            <div className="flex items-center gap-4 text-gray-600">
                {/* Image */}
                <img
                    src={profile}
                    alt="Gourango Modak"
                    className="w-13 h-13 rounded-full border-2 border-gray-200"
                />

                {/* Author name + date in a column */}
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                        Gourango Modak
                    </span>
                    <span className="text-sm text-gray-500">
                        Published on {date}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostHeader;
