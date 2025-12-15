window.onerror = function (message, source, lineno, colno, error) {
    console.error("Global error:", error || message);
    return true;
};

window.onunhandledrejection = function (event) {
    console.error("Unhandled promise rejection:", event.reason);
};
