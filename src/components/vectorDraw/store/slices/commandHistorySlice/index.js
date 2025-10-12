import { executeCommandHandlers } from "./handlers/executeCommandHandlers";
import { undoHandlers } from "./handlers/undoHandlers";

export const createCommandHistorySlice = (set, get) => ({
    commandHistorySlice: {
        undoStack: [],
        redoStack: [],
        currentCommands: {}, // key = commandType, value = command data

        // Begin a command of a specific type
        beginCommand: (type, data) =>
            set((s) => ({
                commandHistorySlice: {
                    ...s.commandHistorySlice,
                    currentCommands: {
                        ...s.commandHistorySlice.currentCommands,
                        [type]: { type, ...data },
                    },
                },
            })),

        // Finalize a command of a specific type
        finalizeCommand: (type, data) => {
            const current = get().commandHistorySlice.currentCommands[type];
            if (!current) return;

            const finalCommand = { ...current, ...data };

            set((s) => {
                const { currentCommands, undoStack } = s.commandHistorySlice;
                const newCurrentCommands = { ...currentCommands };
                delete newCurrentCommands[type];

                return {
                    commandHistorySlice: {
                        ...s.commandHistorySlice,
                        currentCommands: newCurrentCommands,
                        undoStack: [...undoStack, finalCommand],
                        redoStack: [],
                    },
                };
            });
        },

        executeCommand: (command) => {
            const handler = executeCommandHandlers[command.type];
            if (handler) handler(set, command);
            else console.warn("Unknown command type:", command.type);

            // push to undo
            set((s) => ({
                commandHistorySlice: {
                    ...s.commandHistorySlice,
                    undoStack: [...s.commandHistorySlice.undoStack, command],
                    redoStack: [],
                },
            }));
        },

        undo: () => {
            const { undoStack } = get().commandHistorySlice;
            if (!undoStack.length) return;
            const command = undoStack.at(-1);

            const handler = undoHandlers[command.type];
            if (handler) handler(set, command);
            else console.warn("No undo handler for", command.type);

            set((s) => ({
                commandHistorySlice: {
                    ...s.commandHistorySlice,
                    undoStack: undoStack.slice(0, -1),
                    redoStack: [...s.commandHistorySlice.redoStack, command],
                },
            }));
        },

        redo: () => {
            const { redoStack } = get().commandHistorySlice;
            if (!redoStack.length) return;

            const command = redoStack.at(-1);
            get().commandHistorySlice.executeCommand(command);

            set((s) => ({
                commandHistorySlice: {
                    ...s.commandHistorySlice,
                    redoStack: redoStack.slice(0, -1),
                },
            }));
        },
    },
});
