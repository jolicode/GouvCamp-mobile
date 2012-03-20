function SpeakerDetail(dic, id) {
    var joli = dic.joli;
    var helper = dic.helper;
    var models = dic.joli.models.get();
    var speaker = models.speaker.findOneById(id);

    if(!speaker) {
        return null;
    }

    // load dependancies
    var HeaderRow = require('ui/row/Header');
    var Controller = require('lib/controller/SpeakersController');

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
    var commonPadding = 15;

    // presentation
    var headerRow = Ti.UI.createTableViewRow({
        height: 114,
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

    // picture of the speaker
    var picture = ('' != speaker.photo) ? speaker.photo : '/images/appicon@2x.png';
    var pictureView = Ti.UI.createImageView({
        image: picture,
        left: 0,
        top: 0,
        height: 114,
        width: 114,
        defaultImage: 'images/appicon@2x.png',
        backgroundColor: 'transparent',
        touchEnabled: false
    });
    headerRow.add(pictureView);

    var nameLabel = Ti.UI.createLabel({
        text: speaker.getFullName(),
        font: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        textAlign: 'left',
        color: '#000',
        height: 'auto',
        left: 120,
        top: -99,
        ellipsize: true,
        touchEnabled: false
    });
    headerRow.add(nameLabel);

    if(speaker.company != '') {
        var companyLabel = Ti.UI.createLabel({
            text: speaker.company,
            font: {
                fontSize: 14,
                fontWeight: 'bold'
            },
            textAlign: 'left',
            color: '#666',
            height: 'auto',
            left: 120,
            touchEnabled: false
        });
        headerRow.add(companyLabel);
    }

    data.push(headerRow);

    // conferences
    var conferences = speaker.getConferences();

    if(conferences.length > 0) {
        data.push(new HeaderRow(dic, (conferences.length > 1) ? 'Conférences' : 'Conférence'));
        var ConferenceRow = require('ui/row/Conference');

        joli.each(conferences, function(conference, id) {
            data.push(new ConferenceRow(dic, conference));
        });
    }

    // biography
    if(speaker.biography) {
        var BodyRow = require('ui/row/Body');
        data.push(new HeaderRow(dic, 'Biographie'));
        data.push(new BodyRow(dic, speaker.biography));
    }

    self.setData(data);
    self.addEventListener('click', function(e) {
        if(e.row.className == 'conferenceRow') {
            controller.showConference(e.row.conference_id);
        }
    });
    return self;
};

module.exports = SpeakerDetail;
