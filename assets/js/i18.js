i18next.init({
  lng: 'en', // If you're using a detection plugin, you can omit this option
  debug: true,
  resources: {
    en: {
      translation: {
        "key": "value"
        // Add your key-value pairs for English translations
      }
    },
    de: {
      translation: {
        "key": "Wert"
        // Corresponding German translations
      }
    }
    // Add more languages as needed
  }
});
