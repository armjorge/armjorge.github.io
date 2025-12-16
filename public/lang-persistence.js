// Language persistence - load as early as possible
(function () {
    const languages = ['en', 'es', 'fr'];
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);

    // Get current language from URL
    const urlLang = languages.includes(parts[0]) ? parts[0] : null;

    // Get preferred language from localStorage
    const preferredLang = localStorage.getItem('preferred-lang');

    // If user has a preference and URL doesn't match, redirect
    if (preferredLang && languages.includes(preferredLang) && urlLang !== preferredLang) {
        let newPath = path;

        // Remove current language from path if present
        if (urlLang) {
            newPath = '/' + parts.slice(1).join('/');
        }

        // Add preferred language
        if (!newPath.startsWith('/')) {
            newPath = '/' + newPath;
        }
        newPath = '/' + preferredLang + newPath;

        // Only redirect if path actually changed
        if (newPath !== path) {
            window.location.pathname = newPath;
        }
    }

    // If user is on a language page and hasn't selected yet, save it as preference
    if (urlLang && !preferredLang) {
        localStorage.setItem('preferred-lang', urlLang);
    }
})();
