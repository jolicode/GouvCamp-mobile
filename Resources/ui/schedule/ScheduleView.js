function ScheduleView(dic) {
    //load component dependencies
    var ScheduleList = require('ui/schedule/ScheduleList');

    var self = Titanium.UI.createView();

    var label = Titanium.UI.createLabel({
        color: '#000',
        font: { fontSize: '12px' },
        text: 'La notion de programme reste limitée dans le cadre d\'un GouvCamp, dans la mesure où tous les participants sont invités à prendre la parole et à prendre part aux échanges : n\'hésitez donc pas à participer !',
        top: 10,
        left: 10,
        right: 10,
        height: 60
    });

    var scheduleList = new ScheduleList(dic);
    self.add(label);
    self.add(scheduleList);

    return self;
}

module.exports = ScheduleView;
