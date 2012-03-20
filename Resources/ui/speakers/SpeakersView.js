function SpeakersView(dic) {
    //load component dependencies
    var SpeakersList = require('ui/speakers/SpeakersList');

    var self = Ti.UI.createView();
    var speakersList = new SpeakersList(dic);
    self.add(speakersList);

    return self;
}

module.exports = SpeakersView;
