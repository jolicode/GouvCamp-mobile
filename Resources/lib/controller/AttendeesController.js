function AttendeesController(dic) {
    var joli = dic.joli;
    var models = dic.joli.models.get();
    var self = {};

    self.update = function(tableview) {
        var attendees = models.attendee.all({
            order: ['last_name asc']
        });

        if(attendees.length > 0) {
            tableview.show();
        } else {
            models.attendee.forceReload();
            tableview.hide();
            return;
        }

        var HeaderRow = require('ui/row/Header');

        var data = [];
        var old_initial = null;
        var AttendeeRow = require('ui/row/Attendee');
        Titanium.API.log('info', 'Pushing ' + attendees.length + ' attendees.');

        joli.each(attendees, function(attendee, id) {
            var row = new AttendeeRow(dic, attendee, {
                backgroundColor: '#fff',
                borderColor: '#efefef',
                color: '#3693cc'
            });
            var initial = attendee.last_name.substring(0, 1);

            if(old_initial != initial) {
                row.header = initial;
                old_initial = initial;
            }

            data.push(row);
        });

        tableview.setData(data);
    };
    return self;
}

module.exports = AttendeesController;
