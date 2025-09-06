const ProjectLinkCard = ({
    icon,
    title,
    description,
    url,
    linkText,
    styles,
}) => (
    <div
        className={`link-card flex flex-col justify-between rounded-xl border p-6 shadow hover:shadow-lg transition ${styles}`}
    >
        <div className="flex flex-col items-start gap-2">
            <span className="text-3xl">{icon}</span>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm">{description}</p>
        </div>
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-semibold"
        >
            {linkText} →
        </a>
    </div>
);

export default ProjectLinkCard;
