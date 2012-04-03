function AttendeesView(dic) {
    //load component dependencies
    var AttendeesList = require('ui/attendees/AttendeesList');

    var self = Ti.UI.createView();
    var attendeesList = new AttendeesList(dic);
    self.add(attendeesList);

    return self;
}

module.exports = AttendeesView;
