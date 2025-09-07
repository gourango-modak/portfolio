export const textHandler = {
    onPointerDown: (_, { startText }, coords) => {
        const { x, y } = coords;
        startText(x, y);
    },

    onPointerMove: () => {},

    onPointerUp: () => {},
};
