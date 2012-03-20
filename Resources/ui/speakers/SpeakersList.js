function SpeakersList(dic) {
    var SpeakersController = require('lib/controller/SpeakersController');

    var self = Titanium.UI.createTableView({
        editable: false,
        moveable: true,
        top: 0,
        backgroundColor: '#fff',
        rowBackgroundColor: 'transparent',
        data: [],
        layout: 'vertical'
    });

    // add some interactions
    var controller = new SpeakersController(dic);
    controller.update(self);
    var timesUpdated = 0;
    var maxUpdates = 1;

    Ti.App.addEventListener('joli.records.saved', function(event) {
        if(event.table == 'speaker') {
            if (timesUpdated < maxUpdates) {
                controller.update(self);
                timesUpdated++;
            }
        }
    });

    self.addEventListener('click', function(e) {
        if (e.row.className == 'speakerRow') {
            controller.showSpeaker(e.row.speaker_id);
        }
    });

//    if(Titanium.Platform.name != 'android') {
        // add the "pull to refresh" behavior
        var PullToRefresh = require('lib/PullToRefresh');
        var pullToRefresh = new PullToRefresh();
        pullToRefresh.apply(self, function() {
            dic.joli.models.get('conference').truncate();
            dic.joli.models.get('conference_speaker').truncate();
            dic.joli.models.get('speaker').truncate();

            controller.update(self);
        });
//    }

    return self;
};

module.exports = SpeakersList;
