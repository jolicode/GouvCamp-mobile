function ConferenceRow(dic, conference, options) {
    var defaults = {
        backgroundColor: '#3693cc',
        borderColor: '#efefef',
        color: '#fff'
    };
    options = dic.joli.merge(defaults, options);
    var helper = dic.helper;

    var self = Ti.UI.createTableViewRow({
        conference_id: conference.id,
        height: 'auto',
        className: 'conferenceRow',
        borderColor: options.borderColor,
        hasChild: true,
        backgroundColor: options.backgroundColor,
        backgroundSelectedImage: 'images/sessionbckgd@2x.png',
        layout: 'vertical'
    });

    var titleLabel = Ti.UI.createLabel({
        text: conference.title,
        font: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        left: 10,
        top: 10,
        height: 'auto',
        color: options.color,
        touchEnabled: false
    });
    self.add(titleLabel);

    if(conference.type == 'debat' || conference.type == 'atelier') {
        var typeLabel = Ti.UI.createLabel({
            text: (conference.type == 'debat') ? 'Session de débats' : 'Session d\'atelier sur le projet "Parlement et citoyens"',
            font: {
                fontSize: 14,
                fontWeight: 'normal'
            },
            textAlign: 'left',
            color: '#000',
            left: 10,
            top: 5,
            bottom: 12,
            right: 10,
            height: 'auto'
        });
        self.add(typeLabel);
    }

    return self;
}

module.exports = ConferenceRow;
