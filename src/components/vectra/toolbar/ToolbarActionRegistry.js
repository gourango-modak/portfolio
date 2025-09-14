export const createToolbarActionRegistry = (store) => ({
    selectTool: ({ name }) => {
        store.setSelectedTool(name);
    },
    nextPage: () => {
        store.nextPage();
    },
    previousPage: () => {
        store.prevPage();
    },
    saveDrawing: () => {
        const jsonString = store.serialize();
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "drawing.json";
        a.click();
        URL.revokeObjectURL(url);
    },
    loadDrawing: () => {
        const handleLoad = (event) => {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    store.deserialize(e.target.result);
                } catch (err) {
                    console.error("Failed to load drawing", err);
                }
            };
            reader.readAsText(file);
        };

        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = handleLoad;
        input.click();
    },
});
