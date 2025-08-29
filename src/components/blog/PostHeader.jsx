import profile from "../../assets/gm.png";
const PostHeader = ({ title, date }) => {
    return (
        <div className="border-b pb-6 border-gray-300">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3">
                {title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                    <img
                        src={profile}
                        alt="Gourango Modak"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium">Gourango Modak</span>
                </div>
                <span className="text-sm">-</span>
                <span className="text-sm">{date}</span>
            </div>
        </div>
    );
};

export default PostHeader;
