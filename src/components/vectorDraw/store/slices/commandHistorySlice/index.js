import { executeCommandHandlers } from "./handlers/executeCommandHandlers";
import { undoHandlers } from "./handlers/undoHandlers";

export const createCommandHistorySlice = (set, get) => ({
    commandHistorySlice: {
        undoStack: [],
        redoStack: [],
        currentCommand: null,

        beginCommand: (type, data) =>
            set((s) => ({
                commandHistorySlice: {
                    ...s.commandHistorySlice,
                    currentCommand: { type, ...data },
                },
            })),

        finalizeCommand: (data) => {
            const { currentCommand } = get().commandHistorySlice;
            if (!currentCommand) return;

            const finalCommand = { ...currentCommand, ...data };
            set((s) => ({
                commandHistorySlice: {
                    ...s.commandHistorySlice,
                    currentCommand: null,
                    undoStack: [
                        ...s.commandHistorySlice.undoStack,
                        finalCommand,
                    ],
                    redoStack: [],
                },
            }));
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
