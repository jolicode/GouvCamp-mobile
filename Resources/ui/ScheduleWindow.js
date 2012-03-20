function ScheduleWindow(dic) {
    //load component dependencies
    var ScheduleView = require('ui/schedule/ScheduleView');

    var self = Ti.UI.createWindow({
        title: 'Programme',
        backgroundImage: '/images/bg.png',
        navBarHidden: false,
        barColor: '#3693cc'
    });

    var scheduleView = new ScheduleView(dic);
    self.add(scheduleView);

    return self;
};

module.exports = ScheduleWindow;
