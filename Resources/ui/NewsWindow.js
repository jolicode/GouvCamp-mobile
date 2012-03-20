function NewsWindow(dic) {
    var joli = dic.joli;
    var helper = dic.helper;

    //load component dependencies
    var NewsList = require('ui/news/NewsList');
    var NewsController = require('lib/controller/NewsController');

    // some configuration vars
    var colors = {
        selected: '#fff',
        unselected: '#3693cc'
    };
    var configuration = [{
        isSearch: false,
        title: '@OpenGovFr',
        url: 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=OpenGovFr&count=50',
        view: new NewsList(dic, '@OpenGovFr')
    }, {
        isSearch: true,
        title: '#GouvCamp',
        url: 'http://search.twitter.com/search.json?q=%23GouvCamp&result_type=recent&rpp=50',
        view: new NewsList(dic, '#GouvCamp')
    }];

    // some preparation...
    var controller = new NewsController(dic);
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

    // contains the tweets lists
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
            var index = e.source.index;

            joli.each(configuration, function(tab, j) {
                tab.tabView.backgroundColor = (index == j) ? colors.selected : colors.unselected;
                var labels = tab.tabView.getChildren();
                labels[0].color = (index == j) ? colors.unselected : colors.selected;
            });

            scrollable.scrollToView(configuration[index].view);
        });

        tabbedBar.add(tabView);
        configuration[i].tabView = tabView;

        // load the content for each tab
        controller.update(item);
    });

    self.add(tabbedBar);
    self.add(scrollable);

    if(Titanium.Platform.name != 'android') {
        // add the "pull to refresh" behavior
        var PullToRefresh = require('lib/PullToRefresh');
        var pullToRefresh = new PullToRefresh();

        joli.each(configuration, function(item, i) {
            pullToRefresh.apply(item.view, function() {
                controller.update(item);
            });
        });
    }

    return self;
};

module.exports = NewsWindow;
