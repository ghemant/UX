(function () {
    var STORAGE_KEY = "portfolio-theme";
    var root = document.documentElement;

    function readStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function writeStoredTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            // Ignore storage errors and keep the theme for the current page view.
        }
    }

    function getPreferredTheme() {
        var saved = readStoredTheme();
        if (saved === "light" || saved === "dark") {
            return saved;
        }
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
    }

    function getButtonContainer() {
        return (
            document.querySelector(".topbar-inner") ||
            document.querySelector(".top-nav") ||
            document.querySelector(".kicker-row")
        );
    }

    function updateButton(button, theme) {
        var isDark = theme === "dark";
        button.setAttribute("aria-pressed", isDark ? "true" : "false");
        button.setAttribute(
            "aria-label",
            isDark ? "Switch to light theme" : "Switch to dark theme"
        );
        button.innerHTML =
            '<span class="theme-toggle-icon" aria-hidden="true">' +
            (isDark ? "☀" : "◐") +
            "</span><span>" +
            (isDark ? "Light" : "Dark") +
            "</span>";
    }

    function createToggle() {
        if (document.querySelector("[data-theme-toggle]")) {
            return;
        }

        var container = getButtonContainer();
        if (!container) {
            return;
        }

        var button = document.createElement("button");
        button.type = "button";
        button.className = "theme-toggle";
        button.setAttribute("data-theme-toggle", "true");

        var current = root.getAttribute("data-theme") || "light";
        updateButton(button, current);

        button.addEventListener("click", function () {
            var next = (root.getAttribute("data-theme") || "light") === "dark" ? "light" : "dark";
            applyTheme(next);
            writeStoredTheme(next);
            updateButton(button, next);
        });

        container.appendChild(button);
    }

    applyTheme(getPreferredTheme());

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", createToggle);
    } else {
        createToggle();
    }
})();
