const Section = ({ id = "", bgClass = "", children }) => {
    return (
        <section id={id} className={`py-20 ${bgClass}`}>
            <div className="container mx-auto px-6 md:px-12 md:max-w-6xl">
                {children}
            </div>
        </section>
    );
};

export default Section;
