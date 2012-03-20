function SpeakersController(dic) {
    var joli = dic.joli;
    var models = dic.joli.models.get();
    var self = {};

    self.update = function(tableview) {
        var speakers = models.speaker.all({
            order: ['last_name asc']
        });

        if(speakers.length > 0) {
            tableview.show();
        } else {
            models.speaker.forceReload();
            tableview.hide();
            return;
        }

        var HeaderRow = require('ui/row/Header');

        var data = [];
        var old_initial = null;
        var SpeakerRow = require('ui/row/Speaker');
        Titanium.API.log('info', 'Pushing ' + speakers.length + ' speakers.');

        joli.each(speakers, function(speaker, id) {
            var row = new SpeakerRow(dic, speaker, {
                backgroundColor: '#fff',
                borderColor: '#efefef',
                color: '#3693cc'
            });
            var initial = speaker.last_name.substring(0, 1);

            if(old_initial != initial) {
                row.header = initial;
                old_initial = initial;
            }

            data.push(row);
        });

        tableview.setData(data);
    };

    self.showConference = function(id) {
        var SessionWindow = require('ui/SessionWindow');
        dic.tabGroup.activeTab.open(new SessionWindow(dic, id), {
            animated: true
        });
    };

    self.showSpeaker = function(id) {
        var SpeakerWindow = require('ui/SpeakerWindow');
        dic.tabGroup.activeTab.open(new SpeakerWindow(dic, id), {
            animated: true
        });
    };
    return self;
}

module.exports = SpeakersController;
