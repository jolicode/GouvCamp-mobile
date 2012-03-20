function NewsController(dic) {
    var joli = dic.joli;
    var helper = dic.helper;
    var self = {};

    self.update = function(config) {
        var tableview = config.view;
        var url = config.url;
        var isSearch = config.isSearch;
        var xhr = Ti.Network.createHTTPClient();
        xhr.timeout = 20000;
        xhr.open('GET', url);

        xhr.onload = function() {
            try {
                var json = joli.jsonParse(this.responseText);
                var tweets = isSearch ? json.results : json;
                var data = [];

                joli.each(tweets, function(tweet, i) {
                    var text = tweet.text;
                    var user = isSearch ? tweet.from_user : tweet.user.screen_name;
                    var avatarWidth = 48;
                    var avatar = isSearch ? tweet.profile_image_url : tweet.user.profile_image_url;
                    var created_at = tweet.created_at;
                    var backgroundColor = (i % 2) === 0 ? '#fff' : '#eee';

                    var row = Ti.UI.createTableViewRow({
                        hasChild: true,
                        className: 'twitterRow',
                        backgroundColor: backgroundColor,
                        height: 'auto',
                        date: created_at,
                        user: user,
                        tweet: tweet
                    });
                    var imageView = Ti.UI.createImageView({
                        image: avatar,
                        left: 10,
                        top: 10,
                        height: 48,
                        width: avatarWidth
                    });
                    row.add(imageView);

                    var postView = Ti.UI.createView({
                        height: 15,
                        left: 64,
                        top: 10,
                        right: 5
                    });
                    var userLabel = Ti.UI.createLabel({
                        text: user,
                        left: 0,
                        width: 120,
                        top: -3,
                        height: 20,
                        textAlign: 'left',
                        color: '#444444',
                        font: {
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    });
                    postView.add(userLabel);

                    var dateLabel = Ti.UI.createLabel({
                        text: created_at,
                        right: 20,
                        top: -2,
                        height: 20,
                        textAlign: 'right',
                        width: 110,
                        color: '#444444',
                        font: {
                            fontSize: 12
                        }
                    });
                    postView.add(dateLabel);
                    row.add(postView);

                    var tweetLabel = Ti.UI.createLabel({
                        text: text,
                        left: 64,
                        top: 30,
                        right: 20,
                        color: '#333',
                        height: 'auto',
                        textAlign: 'left',
                        bottom: 10,
                        font: {
                            fontSize: 14
                        }
                    });
                    row.add(tweetLabel);
                    data.push(row);
                });

                tableview.setData(data);
            } catch (e) {
                Ti.API.info(e);
            }
        };

        xhr.send();
    }
    return self;
}

module.exports = NewsController;
