function TabGroup(dic, id) {
    var models = dic.joli.models.get();

    // load tab dependancies
    var ScheduleWindow = require('ui/ScheduleWindow');
    var AttendeesWindow = require('ui/AttendeesWindow');
    var SpeakersWindow = require('ui/SpeakersWindow');
    var NewsWindow = require('ui/NewsWindow');
    var MapWindow = require('ui/MapWindow');
    var AboutWindow = require('ui/AboutWindow');

    // create the tab group
    var self = Titanium.UI.createTabGroup();

    //create app windows
    var wins = [
      new ScheduleWindow(dic),
      new AttendeesWindow(dic),
      new NewsWindow(dic),
      new MapWindow(dic),
      new AboutWindow(dic),
    ];

    // create tabs
    var tabs = [];

    tabs.push(Titanium.UI.createTab({
        icon: '/images/icons/schedule.png',
        title: 'Programme',
        window: wins[0]
    }));
    tabs.push(Titanium.UI.createTab({
        icon: '/images/icons/attendees.png',
        title: 'Participants',
        window: wins[1]
    }));
    tabs.push(Titanium.UI.createTab({
        icon: '/images/icons/news.png',
        title: 'Actualités',
        window: wins[2]
    }));
    tabs.push(Titanium.UI.createTab({
        icon: '/images/icons/map.png',
        title: 'Plan d\'accès',
        window: wins[3]
    }));
    tabs.push(Titanium.UI.createTab({
        icon: '/images/icons/about.png',
        title: 'À propos',
        window: wins[4]
    }));
    wins[0].containingTab = tabs[0];
    wins[1].containingTab = tabs[1];
    wins[2].containingTab = tabs[2];
    wins[3].containingTab = tabs[3];
    wins[4].containingTab = tabs[4];

    dic.joli.each(tabs, function(tab, key) {
        self.addTab(tab);
    });

    self.setActiveTab(tabs[id]);
    return self;
}

module.exports = TabGroup;
