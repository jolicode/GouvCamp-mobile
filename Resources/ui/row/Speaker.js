function SpeakerRow(dic, speaker, options) {
    var defaults = {
        backgroundColor: '#3693cc',
        borderColor: '#efefef',
        color: '#fff'
    };
    options = dic.joli.merge(defaults, options);
    var helper = dic.helper;

    var self = Ti.UI.createTableViewRow({
        speaker_id: speaker.id,
        height: 'auto',
        className: 'speakerRow',
        borderColor: options.borderColor,
        hasChild: true,
        backgroundColor: options.backgroundColor,
        backgroundSelectedImage: 'images/sessionbckgd@2x.png',
        layout: 'vertical'
    });

    // picture of the speaker
    var picture = ('' != speaker.photo) ? speaker.photo : '/images/appicon@2x.png';
    var pictureView = Ti.UI.createImageView({
        image: picture,
        left: 5,
        top: 5,
        height: 50,
        width: 50,
        defaultImage: 'images/appicon@2x.png',
        backgroundColor: 'transparent',
        touchEnabled: false
    });
    self.add(pictureView);

    var nameLabel = Ti.UI.createLabel({
        text: speaker.getFullName(),
        font: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        left: 65,
        top: -45,
        height: 'auto',
        color: options.color,
        touchEnabled: false
    });
    self.add(nameLabel);

    if(speaker.company) {
        var companyLabel = Ti.UI.createLabel({
            text: speaker.company,
            font: {
                fontSize: 13,
                fontWeight: 'normal'
            },
            left: 65,
            bottom: 15,
            height: 'auto',
            color: options.color,
            touchEnabled: false
        });
        self.add(companyLabel);
    }

    return self;
}

module.exports = SpeakerRow;
