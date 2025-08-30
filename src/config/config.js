export const CONFIG = {
    IS_DEVENV: import.meta.env.MODE === "development",
    BREADCRUMB_MAX_LENGTH: 18,
    CARD_DESCRIPTION_MAX_LENGTH: 200,
    SIMULATE_API_DELAY: false,

    // Feature Flags: Toggle features on or off based on the environment
    FEATURE_FLAGS: {
        SHOW_ADD_PROJECT_BUTTON: true,
    },
};
