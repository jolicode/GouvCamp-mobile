function AboutWindow(dic) {
    var joli = dic.joli;

    //load component dependencies
    var AboutView = require('ui/about/AboutView');

    // some configuration vars
    var colors = {
        selected: '#fff',
        unselected: '#3693cc'
    };
    var configuration = [{
        title: 'Parlement et citoyens',
        view: new AboutView('http://parlement-et-citoyens.fr/mobile-explication')
    }, {
        title: 'Partenaires',
        view: new AboutView('http://parlement-et-citoyens.fr/mobile-soutien')
    }];

    // some preparation...
    var width = Ti.Platform.displayCaps.platformWidth;

    // create the component
    var self = Ti.UI.createWindow({
        title: 'Actualités',
        backgroundImage: '/images/bg.png',
        navBarHidden: true
    });

    // contains the tabs on the top of the page
    var tabbedBar = Ti.UI.createView({
        top: 0,
        backgroundColor: '#3693cc',
        height: 40,
        left: 0,
        right: 0
    });

    // contains the web pages lists
    var scrollable = Ti.UI.createScrollableView({
        showPagingControl: false,
        backgroundColor: 'transparent',
        top: 40,
        views: (function() {
            var views = [];

            joli.each(configuration, function(item, i) {
                views.push(item.view);
            });
            return views;
        })()
    });

    // create the tabs in the tabBar
    joli.each(configuration, function(item, i) {
        var backgroundColor = (i == 0) ? colors.selected : colors.unselected;
        var color = (i == 0) ? colors.unselected : colors.selected;
        tabView = Ti.UI.createView({
            backgroundColor: backgroundColor,
            height: 40,
            left: i * (width / configuration.length),
            right: width - ((parseInt(i) + 1) * (width / configuration.length)),
            index: i
        });
        tabLabel = Ti.UI.createLabel({
            text: item.title,
            textAlign: 'center',
            color: color,
            height: 'auto',
            touchEnabled: false
        });
        tabView.add(tabLabel);

        tabView.addEventListener('click', function(e) {
            if(e.source) {
                var index = e.source.index;

                joli.each(configuration, function(tab, j) {
                    tab.tabView.backgroundColor = (index == j) ? colors.selected : colors.unselected;
                    var labels = tab.tabView.getChildren();
                    labels[0].color = (index == j) ? colors.unselected : colors.selected;
                });

                scrollable.scrollToView(configuration[index].view);
            }
        });

        tabbedBar.add(tabView);
        configuration[i].tabView = tabView;
    });
    // synchronize back the tabbed bar
    scrollable.addEventListener('scroll', function(e) {
        if(e.view) {
            configuration[e.currentPage].tabView.fireEvent('click');
        }
    });

    self.add(tabbedBar);
    self.add(scrollable);

    return self;
};

module.exports = AboutWindow;
