function MapWindow(dic) {
    var helper = dic.helper;
    var models = dic.joli.models.get();

    var self = Ti.UI.createWindow({
        title: 'Plan d\'accès',
        backgroundImage: '/images/bg.png',
        navBarHidden: false,
        barColor: '#3693cc'
    });

    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.distanceFilter = 10;
    Titanium.Geolocation.preferredProvider = "gps";
    Titanium.Geolocation.purpose = 'Afficher les établissements aux alentours';

    var mapview = Titanium.Map.createView({
        mapType: Titanium.Map.STANDARD_TYPE,
        animate: true,
        regionFit: true,
        userLocation: true,
        region: {
            latitude: 48.860934,
            longitude: 2.315655,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }
    });

    // add annotation for the establishment
    var annotationParams = {
        latitude: 48.860934,
        longitude: 2.315655,
        title: 'Salle Lamartine',
        subtitle: '101 rue de l\'Université\n75007 Paris',
        animate: false,
        leftButton: 'images/appicon.png',
        rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE
    };

    if(Titanium.Platform.name != 'android') {
        annotationParams.pincolor = Titanium.Map.ANNOTATION_GREEN;
    } else {
        annotationParams.pinImage = "/images/map-pin.png";
    }

    var annotation = Titanium.Map.createAnnotation(annotationParams);
    mapview.setAnnotations([annotation]);
    mapview.selectAnnotation(annotation);

    self.add(mapview);
    return self;
};

module.exports = MapWindow;
