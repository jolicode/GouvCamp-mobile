//bootstrap and check dependencies
if(Ti.version < 1.8) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
} else if(Ti.Platform.osname === 'mobileweb') {
    alert('Mobile web is not yet supported by this template');
} else {
    // load parameters
    Ti.include('/lib/initialize.js');
    var dic = {};

    // require database components
    var joliBase = require('lib/vendor/joli.js/joli').connect(Titanium.App.Properties.getString('database_name'));
    var joliApi = require('lib/vendor/joli.api.js/joli.api');
    dic.joli = new joliApi(joliBase);

    var Model = require('lib/model/Model');
    var model = new Model(dic);
    dic.joli.models.initialize();

    // in debug we want to make some cleanup when launching the app...
/*  dic.joli.models.get('attendee').truncate();
    dic.joli.models.get('conference').truncate();
    dic.joli.models.get('conference_speaker').truncate();
    dic.joli.models.get('table_updates').truncate();
    dic.joli.models.get('speaker').truncate();

    dic.joli.models.get('speaker').forceReload();
    dic.joli.models.get('conference').forceReload();
*/

    var first_update = dic.joli.models.get('conference').getFirstUpdate();

    if(Titanium.Network.online && first_update) {
        var now = new Date().getTime();

        if(first_update < now - 86400 * 1000) {
            // truncate if the data are older than 1 day
            dic.joli.models.get('attendee').truncate();
            dic.joli.models.get('conference').truncate();
            dic.joli.models.get('conference_speaker').truncate();
            dic.joli.models.get('table_updates').truncate();
            dic.joli.models.get('speaker').truncate();

            // and reload it !
            dic.joli.models.get('attendee').forceReload();
            dic.joli.models.get('speaker').forceReload();
            dic.joli.models.get('conference').forceReload();
        }
    }

    //load the helper functions
    var Helper = require('lib/Helper');
    dic.helper = new Helper(dic);
    dic.tabGroup, dic.activityIndicator;

    //require and open top level UI component
    var HomeWindow = require('ui/HomeWindow');
    new HomeWindow(dic).open();
}
