function HomeView(dic) {
    var HomeIcon = require('ui/home/HomeIcon');
    var self = Ti.UI.createView();

    var container = Ti.UI.createView({
        backgroundColor: '#fff',
        borderColor: '#888',
        borderWidth: 4,
        bottom: 20,
        height: 170,
        width: 306,
        borderRadius: 8,
        opacity: 0.75
    });

    var icons = [
      {
          id: 0,
          title: 'PROGRAMME',
          image: '/images/icons/schedule_dark.png'
      },
      {
          id: 1,
          title: 'CONFÉRENCIERS',
          image: '/images/icons/speaker_dark.png'
      },
      {
          id: 2,
          title: 'ACTUALITÉS',
          image: '/images/icons/news_dark.png'
      },
      {
          id: 3,
          title: 'PLAN D\'ACCÈS',
          image: '/images/icons/map_dark.png'
      },
      {
          id: 4,
          title: 'À PROPOS',
          image: '/images/icons/about_dark.png'
      }
    ];

    var viewIcons = Ti.UI.createView({
        backgroundColor: 'transparent',
        height: 170,
        width: 306,
        bottom: 20,
        borderRadius: 0,
        layout: 'horizontal'
    });

    var i = 0;

    while (i < icons.length) {
        viewIcons.add(new HomeIcon(dic, icons[i]));
        i++;
    }

    self.add(container);
    self.add(viewIcons);
    return self;
}

module.exports = HomeView;
