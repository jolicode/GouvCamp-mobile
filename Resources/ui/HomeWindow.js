function HomeWindow(dic) {
    //load component dependencies
    var HomeView = require('ui/home/HomeView');

    //create component instance
    var self = Ti.UI.createWindow({
        backgroundImage:'/images/bg.png',
        navBarHidden:true,
        tabBarHidden:true,
        exitOnClose:true
    });

    var width = Ti.Platform.displayCaps.platformWidth - 20;
    var imageview = Ti.UI.createView({
        backgroundImage: '/images/logo-gouvcamp.png',
        top: 80,
        left: 10,
        right: 10,
        height: Math.floor(width / 4)
    });
    self.add(imageview);

    var homeView = new HomeView(dic);
    self.add(homeView);

    return self;
}

module.exports = HomeWindow;
