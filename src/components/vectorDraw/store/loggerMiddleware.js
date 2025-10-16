export const loggerMiddleware =
    (config, options = {}) =>
    (set, get, api) => {
        const { sliceName, pathPrefix } = options;

        if (process.env.NODE_ENV !== "development") {
            return config(set, get, api);
        }

        const wrappedSet = (partial, replace) => {
            const prevState = get();

            set(partial, replace);

            const nextState = get();

            // Filter slice if sliceName is provided
            const prevSlice = sliceName ? prevState[sliceName] : prevState;
            const nextSlice = sliceName ? nextState[sliceName] : nextState;

            // Compute deep diff
            let changes = deepDiff(prevSlice, nextSlice);

            // Filter by path prefix if provided
            if (pathPrefix) {
                changes = changes.filter((c) => c.path.startsWith(pathPrefix));
            }

            if (changes.length) {
                const title = `State Change${
                    sliceName ? `: ${sliceName}` : ""
                }`;
                console.groupCollapsed(
                    `%c${title}`,
                    "color: white; font-weight: bold;"
                );

                changes.forEach(({ path, from, to }) => {
                    console.groupCollapsed(
                        `%c${path}`,
                        "color: white; font-weight: 500;"
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
