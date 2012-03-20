function ScheduleView(dic) {
    //load component dependencies
    var ScheduleList = require('ui/schedule/ScheduleList');

    var self = Ti.UI.createView();
    var scheduleList = new ScheduleList(dic);
    self.add(scheduleList);

    return self;
}

module.exports = ScheduleView;
