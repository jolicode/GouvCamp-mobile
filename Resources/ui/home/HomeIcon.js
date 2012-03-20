function HomeIcon(dic, icon) {
    var self = Ti.UI.createView({
        backgroundColor: 'transparent',
        height: 85,
        top: 0,
        width: 102,
        textAlign: 'center'
    });

    var imageview = Ti.UI.createView({
        backgroundImage: icon.image,
        top: 10,
        height: 47,
        width: 53
    });
    self.add(imageview);

    var label = Ti.UI.createLabel({
        color: '#333',
        text: icon.title,
        font: {
            fontSize: 9,
            fontWeight: 'bold',
        },
        left: 0,
        right: 0,
        top: 55,
        textAlign:'center'
    })
    self.add(label);

    // add a click listener
    self.addEventListener('click', function(e) {
        var HomeController = require('lib/controller/HomeController');
        var controller = new HomeController(dic);
        controller.openTabGroup(icon.id);
    });

    return self;
}

module.exports = HomeIcon;
