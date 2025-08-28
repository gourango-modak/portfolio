// --- FILE: src/config.js ---
const APP_CONFIG = {
	// Change this to 'production' when you deploy
	DEV_ENV: "development",
	NODE_ENV: import.meta.env.MODE,

	// Feature Flags: Toggle features on or off based on the environment
	FEATURE_FLAGS: {
		SHOW_ADD_PROJECT_BUTTON: true,
	},
};
// --- Environment Check ---
// This check now uses the config file.
export const ISDEVENV = APP_CONFIG.NODE_ENV === APP_CONFIG.DEV_ENV;
export const BREADCRUMB_MAX_LENGTH = 32;
