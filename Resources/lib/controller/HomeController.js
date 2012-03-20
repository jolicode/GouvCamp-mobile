function HomeController(dic, icon) {
    var models = dic.joli.models.get();
    var self = {};

    self.openTabGroup = function(index) {
        var first_update = models.conference.getFirstUpdate();

        if(!Titanium.Network.online && !first_update) {
            alert('Vous devez être connecté à Internet pour charger les informations de la conférence !');
            return false;
        }

        var TabGroup = require('ui/TabGroup');
        dic.tabGroup = new TabGroup(dic, index);

        if(Titanium.Platform.name != 'android') {
            dic.tabGroup.open({
                transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
            });
        } else {
            dic.tabGroup.open();
        }
    }
    return self;
}

module.exports = HomeController;
