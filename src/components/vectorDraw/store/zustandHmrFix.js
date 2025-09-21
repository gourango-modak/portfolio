// zustandHmrFix.js
export const zustandHmrFix = (name, useStore) => {
    if (import.meta.hot) {
        const savedState = import.meta.hot.data[name];
        if (savedState) {
            const newState = {
                ...savedState,
                actions: useStore.getState().actions,
            };
            useStore.setState(newState);
        }

        // subscribe to save state on every change
        useStore.subscribe((state) => {
            const stateToSave = { ...state };
            delete stateToSave.actions; // don’t save non-serializable actions
            import.meta.hot.data[name] = stateToSave;
        });

        import.meta.hot.accept((newModule) => {
            if (newModule) {
                const savedState = import.meta.hot.data[name];
                if (savedState) {
                    const newState = {
                        ...savedState,
                        actions: useStore.getState().actions,
                    };
                    useStore.setState(newState);
                }
            }
        });
    }
};
