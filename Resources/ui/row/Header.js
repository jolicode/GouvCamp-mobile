function HeaderRow(dic, text) {
    var helper = dic.helper;

    var self = Ti.UI.createTableViewRow({
        classname: 'headerRow',
        height: 26,
        backgroundImage: '/images/timebreak_gray@2x.png',
        selectedBackgroundImage: '/images/timebreak_gray@2x.png',
        touchEnabled: false
    });
    var headerLabel = Ti.UI.createLabel({
        text: text,
        color: '#fff',
        font: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        left: 10,
        touchEnabled: false
    });
    self.add(headerLabel);

    return self;
}

module.exports = HeaderRow;
