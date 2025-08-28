export const APP_CONFIG = {
    IS_DEVENV: import.meta.env.MODE === "development",
    BREADCRUMB_MAX_LENGTH: 32,

    // Feature Flags: Toggle features on or off based on the environment
    FEATURE_FLAGS: {
        SHOW_ADD_PROJECT_BUTTON: true,
    },
};
