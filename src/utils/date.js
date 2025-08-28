export function formatDate(dateInput, options = {}) {
    const { locale = "en-US", format = {} } = options;

    if (!dateInput) return "";

    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
        console.warn("Invalid date input:", dateInput);
        return "";
    }

    const formatter = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        ...format,
    });

    return formatter.format(date);
}
