function SessionWindow(dic, id) {
    var models = dic.joli.models.get();
    var conference = models.conference.findOneById(id);

    if(!conference) {
        return null;
    }

    var self = Ti.UI.createWindow({
        title: conference.title,
        backgroundImage: '/images/bg.png',
        navBarHidden: false,
        barColor: '#3693cc'
    });

    //load component dependencies
    var SessionDetail = require('ui/schedule/SessionDetail');
    var sessionDetail = new SessionDetail(dic, id);

    self.add(sessionDetail);
    return self;
};

module.exports = SessionWindow;
