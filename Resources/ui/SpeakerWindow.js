function SpeakerWindow(dic, id) {
    var joli = dic.joli;
    var helper = dic.helper;
    var models = dic.joli.models.get();
    var speaker = models.speaker.findOneById(id);

    if(!speaker) {
        return null;
    }

    // create component
    var self = Ti.UI.createWindow({
        title: speaker.getFullName(),
        backgroundImage: '/images/bg.png',
        navBarHidden: false,
        barColor: '#3693cc'
    });

    //load component dependencies
    var SpeakerDetail = require('ui/speakers/SpeakerDetail');
    var speakerDetail = new SpeakerDetail(dic, id);

    self.add(speakerDetail);
    return self;
};

module.exports = SpeakerWindow;
