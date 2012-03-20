function Body(dic, text) {
    var helper = dic.helper;

    if (text) {
        text = text.replace('\n', '\n\n');
    }

    var self = Ti.UI.createTableViewRow({
        hasChild: false,
        height: 'auto',
        backgroundColor: '#fff',
        left: 0,
        top: -5,
        bottom: 10,
        layout: 'vertical',
        className: 'bodyRow',
        selectionStyle: 'none'
    });
    var label = Ti.UI.createLabel({
        text: text,
        backgroundColor: '#fff',
        textAlign: 'left',
        color: '#000',
        height: 'auto',
        width: helper.isAndroid() ? '92%' : 'auto',
        top: 15,
        bottom: 15,
        font: {
            fontSize: 16
        }
    });
    self.add(label);

    if(!helper.isAndroid()) {
        self.right = 15;
        self.left = 15;
    }

    return self;
}

module.exports = Body;
