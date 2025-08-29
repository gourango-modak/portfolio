export default function HeaderBlock({ text, level }) {
    const Tag = `h${level}`;

    // const fontSizeMap = {
    //     1: "text-2xl", // h1
    //     2: "text-xl", // h2
    //     3: "text-lg", // h3
    //     4: "text-base", // h4
    // };

    // const fontSizeClass = fontSizeMap[level] || "text-base"; // fallback

    return <Tag className={` text-slate-800 ${""}`}>{text}</Tag>;
}
