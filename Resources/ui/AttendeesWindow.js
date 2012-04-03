function AttendeesWindow(dic) {
    var helper = dic.helper;
    var models = dic.joli.models.get();

    //load component dependencies
    var AttendeesView = require('ui/attendees/AttendeesView');

    var self = Ti.UI.createWindow({
        title: 'Participants',
        backgroundImage: '/images/bg.png',
        navBarHidden: false,
        barColor: '#3693cc'
    });

    var attendeesView = new AttendeesView(dic);
    self.add(attendeesView);

    return self;
};

module.exports = AttendeesWindow;
