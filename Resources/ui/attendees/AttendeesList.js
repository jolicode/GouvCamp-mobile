function AttendeesList(dic) {
    var AttendeesController = require('lib/controller/AttendeesController');

    var self = Titanium.UI.createTableView({
        editable: false,
        moveable: true,
        top: 0,
        backgroundColor: '#fff',
        rowBackgroundColor: 'transparent',
        data: [],
        layout: 'vertical'
    });

    // add some interactions
    var controller = new AttendeesController(dic);
    controller.update(self);

    Ti.App.addEventListener('joli.records.saved', function(event) {
        if(event.table == 'attendee') {
            controller.update(self);
        }
    });

    var PullToRefresh = require('lib/PullToRefresh');
    var pullToRefresh = new PullToRefresh();
    pullToRefresh.apply(self, function() {
        dic.joli.models.get('attendee').truncate();
        controller.update(self);
    });

    return self;
};

module.exports = AttendeesList;
