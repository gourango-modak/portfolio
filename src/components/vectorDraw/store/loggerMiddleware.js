/**
 * Logger middleware for Zustand store (development mode only)
 *
 * This middleware tracks state changes and logs them in a structured, readable format.
 * It is highly configurable, allowing you to focus on specific slices, properties, or
 * paths, and also to log entire slices or specific paths regardless of change.
 *
 * Configuration Options:
 *
 * sliceName: string (optional)
 *   - The specific slice of the store to monitor.
 *   - If not provided, the middleware tracks the entire store.
 *
 * pathPrefixes: string[] (optional)
 *   - Array of path prefixes within the slice to filter which diffs are logged.
 *   - Only changes under these paths will appear in the console.
 *   - Example: ["shapes", "selectedShapeIds"] logs changes in shapes and selected IDs only.
 *
 * logFullSlice: boolean (default: false)
 *   - If true, logs the entire slice whenever any change occurs.
 *   - Useful for debugging or when you want a full snapshot of the slice.
 *
 * logFullPaths: string[] (optional)
 *   - List of paths to always log, even if they haven’t changed.
 *   - Paths are relative to the slice.
 *   - Example: ["shapes.abc123", "selectedShapeIds"] ensures these are always printed.
 *
 * logFullPathsOnChange: string[] (optional)
 *   - List of paths to log fully **only when a change occurs** in the slice.
 *   - Useful for monitoring key nested properties without cluttering logs when no change happens.
 *   - Paths are relative to the slice.
 *   - Example: ["shapes.abc123.properties", "selectedShapeIds"] logs these paths only if the slice changes.
 *
 * Behavior:
 *   - Computes a deep diff between previous and next state (or slice) to log only actual changes.
 *   - Groups logs using console.groupCollapsed for cleaner and expandable output.
 *   - Supports circular references and avoids infinite recursion.
 *
 * Use this middleware to:
 *   - Debug state updates in specific slices.
 *   - Monitor key properties continuously.
 *   - Keep console output concise while still providing full context when needed.
 *
 * Example Usage:
 *   loggerMiddleware(config, {
 *       sliceName: "shapeSlice",
 *       pathPrefixes: ["shapes", "selectedShapeIds"],
 *       logFullSlice: false,
 *       logFullPaths: ["shapes.abc123", "selectedShapeIds"],
 *       logFullPathsOnChange: ["shapes.abc123.properties"],
 *   });
 */

export const loggerMiddleware =
    (config, options = {}) =>
    (set, get, api) => {
        const {
            sliceName,
            pathPrefixes = [], // paths to track changes (diff)
            logFullSlice = false, // log full slice if any change occurs
            logFullPaths = [], // paths to always log even if no change
            logFullPathsOnChange = [], // paths to log full value if any change occurs
        } = options;

        if (process.env.NODE_ENV !== "development") {
            return config(set, get, api);
        }

        const wrappedSet = (partial, replace) => {
            const prevState = get();
            set(partial, replace);
            const nextState = get();

            const prevSlice = sliceName ? prevState[sliceName] : prevState;
            const nextSlice = sliceName ? nextState[sliceName] : nextState;

            // Compute deep diff
            let changes = deepDiff(prevSlice, nextSlice);

            // Filter diffs by pathPrefixes
            if (pathPrefixes.length > 0) {
                changes = changes.filter((c) =>
                    pathPrefixes.some((prefix) => c.path.startsWith(prefix))
                );
            }

            // Always log full paths (independent of changes)
            const alwaysLogPaths = logFullPaths.map((prefix) => {
                const value = prefix
                    .split(".")
                    .reduce((obj, key) => obj?.[key], nextSlice);
                return { path: prefix, value };
            });

            // Log full paths conditionally when any change occurs
            const conditionalFullPaths =
                logFullPathsOnChange.length && changes.length
                    ? logFullPathsOnChange.map((prefix) => {
                          const value = prefix
                              .split(".")
                              .reduce((obj, key) => obj?.[key], nextSlice);
                          return { path: prefix, value };
                      })
                    : [];

            if (
                changes.length ||
                logFullSlice ||
                alwaysLogPaths.length ||
                conditionalFullPaths.length
            ) {
                const title = `State Change${
                    sliceName ? `: ${sliceName}` : ""
                }`;
                console.groupCollapsed(
                    `%c${title}`,
                    "color: white; font-weight: bold;"
                );

                // Log diffs
                changes.forEach(({ path, from, to }) => {
                    console.groupCollapsed(
                        `%c${path}`,
                        "color: white; font-weight: 600;"
                    );
                    console.log(
                        "%cFROM:",
                        "color: white; font-weight: bold;",
                        from
                    );
                    console.log(
                        "%cTO:",
                        "color: white; font-weight: bold;",
                        to
                    );
                    console.groupEnd();
                });

                // Log full slice
                if (logFullSlice) {
                    console.groupCollapsed(
                        "%cFULL SLICE",
                        "color: white; font-weight: bold;"
                    );
                    console.log(nextSlice);
                    console.groupEnd();
                }

                // Log always full paths
                alwaysLogPaths.forEach(({ path, value }) => {
                    console.groupCollapsed(
                        `%cFULL PATH: ${path}`,
                        "color: white; font-weight: bold;"
                    );
                    console.log(value);
                    console.groupEnd();
                });

                // Log conditional full paths on change
                conditionalFullPaths.forEach(({ path, value }) => {
                    console.groupCollapsed(
                        `%cFULL PATH (on change): ${path}`,
                        "color: white; font-weight: bold;"
                    );
                    console.log(value);
                    console.groupEnd();
                });

                console.groupEnd();
            }
        };

        return config(wrappedSet, get, api);
    };

function deepDiff(prev, next, path = "", visited = new WeakSet()) {
    let diffs = [];

    // Ignore non-objects
    if (
        prev === next ||
        typeof prev === "function" ||
        typeof next === "function"
    ) {
        if (prev !== next) {
            diffs.push({ path, from: prev, to: next });
        }
        return diffs;
    }

    // Avoid circular references
    if (prev && typeof prev === "object") {
        if (visited.has(prev)) return diffs;
        visited.add(prev);
    }

    if (next && typeof next === "object") {
        if (visited.has(next)) return diffs;
        visited.add(next);
    }

    const keys = new Set([
        ...(prev && typeof prev === "object" ? Object.keys(prev) : []),
        ...(next && typeof next === "object" ? Object.keys(next) : []),
    ]);

    keys.forEach((key) => {
        const fullPath = path ? `${path}.${key}` : key;
        const prevVal = prev ? prev[key] : undefined;
        const nextVal = next ? next[key] : undefined;

        if (
            typeof prevVal === "object" &&
            prevVal !== null &&
            typeof nextVal === "object" &&
            nextVal !== null
        ) {
            diffs.push(...deepDiff(prevVal, nextVal, fullPath, visited));
        } else if (prevVal !== nextVal) {
            diffs.push({ path: fullPath, from: prevVal, to: nextVal });
        }
    });

    return diffs;
}
