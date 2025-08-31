export const TabPanel = ({ items, activeTab, renderContent }) => (
    <div className="pt-8">
        {items.map(({ id, data }) => (
            <div key={id} className={activeTab === id ? "block" : "hidden"}>
                {renderContent(data)}
            </div>
        ))}
    </div>
);
