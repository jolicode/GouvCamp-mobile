/**
 * Allows to initialize the application, in case it has not been made before.
 */
(function() {
    // database
    Titanium.App.Properties.setString('database_name', 'gouvcamp4');

    // urls
    Titanium.App.Properties.setString('site_url', 'http://parlement-et-citoyens.fr/');
    Titanium.App.Properties.setString('media_url', 'http://parlement-et-citoyens.fr/');
    Titanium.App.Properties.setString('api_url', 'http://lacot.org/tmp/');
})();
