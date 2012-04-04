function ScheduleController(dic) {
    var joli = dic.joli;
    var models = dic.joli.models.get();
    var self = {};

    self.getSpeakerNames = function(id) {
        var speakers = new joli.query().select('speaker.first_name, speaker.last_name').from('speaker').join('conference_speaker', 'conference_speaker.speaker_id', 'speaker.id').where('conference_speaker.conference_id = ?', id).order('last_name asc').execute('array');

        var speaker_names = '';

        joli.each(speakers, function(speaker, key) {
            if('' != speaker_names) {
                speaker_names += ', ';
            }
            speaker_names += speaker['first_name'] + ' ' + speaker['last_name'];
        });
        return speaker_names;
    };

    self.update = function(tableview) {
        var conferences = models.conference.all({
            order: ['start_at asc']
        });

        if(conferences.length > 0) {
            tableview.show();
        } else {
            models.conference.forceReload();
            tableview.hide();
            return;
        }

        var HeaderRow = require('ui/row/Header');

        var data = [];
        var i = 0;
        Titanium.API.log('info', 'Pushing ' + conferences.length + ' conferences.');

        while(i < conferences.length) {
            if(conferences[i].title) {
                var row = Ti.UI.createTableViewRow({
                    backgroundColor: '#fff',
                    hasChild: true,
                    className: 'conferenceRow',
                    height: 'auto',
                    layout: 'vertical',
                    conference_id: conferences[i].id
                });
                var title = Titanium.UI.createLabel({
                    color: '#3693cc',
                    font: {
                        fontSize: 16,
                        fontWeight: 'bold'
                    },
                    height: 'auto',
                    text: conferences[i].title,
                    textAlign: 'left',
                    bottom: 10,
                    top: 10,
                    left: 10,
                    right: 10,
                    touchEnabled: false
                });
                row.add(title);

                var speakerNames = self.getSpeakerNames(conferences[i].id);

                if(speakerNames !== '') {
                    var speakers = Titanium.UI.createLabel({
                        color: '#000',
                        font: {
                            fontSize: 13,
                            fontWeight: 'bold'
                        },
                        height: 'auto',
                        text: speakerNames,
                        textAlign: 'left',
                        top: 5,
                        left: 10,
                        right: 10,
                        touchEnabled: false
                    });
                    row.add(speakers);
                }

                if(conferences[i].type == 'debat') {
                    var type = Titanium.UI.createLabel({
                        color: '#000',
                        font: {
                            fontSize: 13
                        },
                        height: 'auto',
                        text: 'Session de débats',
                        textAlign: 'left',
                        bottom: 10,
                        top: 5,
                        left: 10,
                        right: 10,
                        touchEnabled: false
                    });
                    row.add(type);
                } else if(conferences[i].type == 'atelier') {
                    var type = Titanium.UI.createLabel({
                        color: '#000',
                        font: {
                            fontSize: 13
                        },
                        height: 'auto',
                        text: 'Session d\'atelier sur le projet "Parlement et citoyens"',
                        textAlign: 'left',
                        bottom: 10,
                        top: 5,
                        left: 10,
                        right: 10,
                        touchEnabled: false
                    });
                    row.add(type);
                }

                data.push(new HeaderRow(dic, conferences[i].start_at + " - " + conferences[i].end_at));
                data.push(row);
            }
            i++;
        }

        tableview.data = data;
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

module.exports = ScheduleController;
