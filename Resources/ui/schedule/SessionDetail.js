function SessionDetail(dic, id) {
    var joli = dic.joli;
    var helper = dic.helper;
    var models = dic.joli.models.get();
    var conference = models.conference.findOneById(id);

    if(!conference) {
        return null;
    }

    // load dependancies
    var HeaderRow = require('ui/row/Header');
    var Controller = require('lib/controller/ScheduleController');

    // create controller
    var controller = new Controller(dic);

    // create component
    var self = Titanium.UI.createTableView({
        backgroundColor: 'transparent',
        textAlign: 'left',
        layout: 'vertical',
        separatorColor: '#fff'
    });
    var data = [];

    var headerRow = Ti.UI.createTableViewRow({
        height: 'auto',
        left: 0,
        top: -5,
        bottom: 10,
        layout: 'vertical',
        className: 'mainHeaderRow',
        backgroundImage: 'images/sessionbckgd@2x.png',
        backgroundSelectedImage: 'images/sessionbckgd@2x.png',
        backgroundPosition: 'bottom left',
        selectionStyle: 'none'
    });

    var commonPadding = 15;

    // header
    if(conference.title) {
        var titleLabel = Ti.UI.createLabel({
            text: conference.title,
            font: {
                fontSize: 26,
                fontWeight: 'bold'
            },
            textAlign: 'left',
            color: '#000',
            left: commonPadding,
            top: 18,
            bottom: 7,
            right: commonPadding,
            height: 'auto'
        });
        headerRow.add(titleLabel);
    }

    if(conference.start_at) {
        var datetime = Ti.UI.createLabel({
            text: 'Mardi 10 avril 2012, ' + conference.start_at,
            font: {
                fontSize: 14,
                fontWeight: 'normal'
            },
            textAlign: 'left',
            color: '#000',
            left: commonPadding,
            top: 'auto',
            bottom: 5,
            right: 'auto',
            height: 'auto'
        });
        headerRow.add(datetime);
    }

    if(conference.type == 'debat' || conference.type == 'atelier') {
        var typeLabel = Ti.UI.createLabel({
            text: (conference.type == 'debat') ? 'Session de débats' : 'Session d\'atelier sur le projet "Parlement et citoyens"',
            font: {
                fontSize: 14,
                fontWeight: 'normal'
            },
            textAlign: 'left',
            color: '#000',
            left: commonPadding,
            top: 'auto',
            bottom: 12,
            right: commonPadding,
            height: 'auto'
        });
        headerRow.add(typeLabel);
    }

    data.push(headerRow);

    // speakers
    var speakers = conference.getSpeakers();

    if(speakers.length > 0) {
        data.push(new HeaderRow(dic, (speakers.length > 1) ? 'Conférenciers' : 'Conférencier'));
        var SpeakerRow = require('ui/row/Speaker');

        joli.each(speakers, function(speaker, id) {
            data.push(new SpeakerRow(dic, speaker));
        });
    }

    // description
    var BodyRow = require('ui/row/Body');
    data.push(new HeaderRow(dic, 'Présentation'));
    data.push(new BodyRow(dic, conference.description));

    self.setData(data);
    self.addEventListener('click', function(e) {
        if (e.row.className == 'speakerRow') {
            controller.showSpeaker(e.row.speaker_id);
        }
    });

    return self;
};

module.exports = SessionDetail;
