function Helper(dic) {
    var models = dic.joli.models.get();

    var self = {
        __isAndroid: undefined,
    };

    self.encodeUrl = function(url) {
        if(!url) {
            return null;
        }
        url = url.slice(0, self.strpos(url, '?'));
        return encodeURIComponent(url).replace(/%2F/g, '/').replace(/%25/g, '%');
    };

    self.formatName = function(text) {
        text = text.toLowerCase();
        return self.ucfirst(text);
    };

    self.getCurrentCity = function() {
        var name = Ti.App.Properties.getString('currentCity', null);

        if(null == name) {
            var city = models.city.findOneById(helper.getCurrentCityId());

            if(city) {
                name = city.name;
            }
        }

        return name;
    };

    self.getCurrentCityId = function() {
        var result = Ti.App.Properties.getString('currentCityId', null);

        if(-1 == result) {
            result = null;
        }

        return result;
    };

    self.getCurrentCitySubdomain = function() {
        return Ti.App.Properties.getString('currentCitySubdomain', null);
    };

    self.indicator = {};

    self.indicator.get = function(message) {
        if(!message) {
            message = 'Chargement...';
        }

        var ind = Titanium.UI.createActivityIndicator({
            height: 50,
            width: 250
        });
        ind.style = Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN;
        ind.font = {
            fontFamily: 'Helvetica Neue',
            fontSize: 15,
            fontWeight: 'bold'
        };
        ind.color = 'white';
        ind.message = message;

        if(Titanium.Platform.name != 'android') {
            self.indicator.activityIndicator = Titanium.UI.createWindow({
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: '#000',
                zIndex: 1337,
                opacity: 0.5
            });
            self.indicator.activityIndicator.add(ind);
        } else {
            self.indicator.activityIndicator = ind;
        }

        return self.indicator.activityIndicator;
    };

    self.indicator.hide = function() {
        if(self.indicator.activityIndicator) {
            if(Titanium.Platform.name != 'android') {
                self.indicator.activityIndicator.close();
            } else {
                self.indicator.activityIndicator.hide();
            }
        }
    };

    self.indicator.show = function(message) {
        if(Titanium.Platform.name != 'android') {
            self.indicator.get(message).open();
        } else {
            self.indicator.get(message).show();
        }
    };

    self.isAndroid = function() {
        if (self.__isAndroid === undefined) {
            self.__isAndroid = (Ti.Platform.osname == 'android');
        }

        return self.__isAndroid;
    };

    self.removeBlankLines = function(text) {
        text = text.replace(/\t\r\n/g, '');
        text = text.replace(/\r\n\r\n/g, '\n');
        return text.replace(/\n\n/g, '\n');
    };

    self.strpos = function(haystack, needle) {
        var i = (haystack + '').indexOf(needle, 0);
        return i === -1 ? false : i;
    };

    self.trim = function(str) {
        if(!str) {
            return str;
        }
        str = str.replace(/^\s+/, '');

        for(var i = str.length - 1; i >= 0; i--) {
            if(/\S/.test(str.charAt(i))) {
                str = str.substring(0, i + 1);
                break;
            }
        }

        return str;
    };

    self.ucfirst = function(text) {
        if(!text) {
            return text;
        }

        return text.charAt(0).toUpperCase() + text.substr(1);
    };
    return self;
}

module.exports = Helper;
