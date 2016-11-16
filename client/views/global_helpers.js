Template.registerHelper( 'tr', ( string ) => {
    selectedLanguage = settings.findOne().language;
    return translations[string][selectedLanguage];
});
