export const createToolbarActionRegistry = (store) => ({
    selectTool: ({ name }) => {
        store.setSelectedTool(name);
    },
});
