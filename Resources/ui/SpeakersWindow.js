function SpeakersWindow(dic) {
    var helper = dic.helper;
    var models = dic.joli.models.get();

    //load component dependencies
    var SpeakersView = require('ui/speakers/SpeakersView');

    var self = Ti.UI.createWindow({
        title: 'Conférenciers',
        backgroundImage: '/images/bg.png',
        navBarHidden: false,
        barColor: '#3693cc'
    });

    var speakersView = new SpeakersView(dic);
    self.add(speakersView);

    return self;
};

module.exports = SpeakersWindow;
