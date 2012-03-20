function PullToRefresh() {
    var self = {};

    // Pull to refresh. Almost all of this code taken from KitchenSink
    function formatDate() {
        var date = new Date();
        var datestr = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
        return datestr;
    }


    self.apply = function(tableview, callback) {
        var border = Ti.UI.createView({
            backgroundColor: "#576c89",
            height: 2,
            bottom: 0
        });
        var tableHeader = Ti.UI.createView({
            backgroundColor: "#e2e7ed",
            width: 320,
            height: 60
        });
        tableHeader.add(border);

        var arrow = Ti.UI.createView({
            backgroundImage: "/images/whiteArrow.png",
            width: 23,
            height: 60,
            bottom: 10,
            left: 20
        });
        var statusLabel = Ti.UI.createLabel({
            text: "Tirer pour mettre à jour",
            left: 55,
            width: 200,
            bottom: 30,
            height: "auto",
            color: "#576c89",
            textAlign: "center",
            font: {
                fontSize: 13,
                fontWeight: "bold"
            },
            shadowColor: "#999",
            shadowOffset: {
                x: 0,
                y: 1
            }
        });
        var lastUpdatedLabel = Ti.UI.createLabel({
            text: "Mis à jour : " + formatDate(),
            left: 55,
            width: 200,
            bottom: 15,
            height: "auto",
            color: "#576c89",
            textAlign: "center",
            font: {
                fontSize: 12
            },
            shadowColor: "#999",
            shadowOffset: {
                x: 0,
                y: 1
            }
        });
        var actInd = Titanium.UI.createActivityIndicator({
            left: 20,
            bottom: 13,
            width: 30,
            height: 30
        });

        tableHeader.add(arrow);
        tableHeader.add(statusLabel);
        tableHeader.add(lastUpdatedLabel);
        tableHeader.add(actInd);
        tableview.headerPullView = tableHeader;

        var pulling = false;
        var reloading = false;

        function beginReloading() {
            // just mock out the reload
            setTimeout(endReloading, 3000);
        }

        function endReloading() {
            callback();

            // when you're done, just reset
            tableview.setContentInsets({
                top: 0
            }, {
                animated: true
            });
            reloading = false;
            lastUpdatedLabel.text = "Mis à jour : " + formatDate();
            statusLabel.text = "Tirer pour mettre à jour";
            actInd.hide();
            arrow.show();
        }


        tableview.addEventListener('scroll', function(e) {
            if (!e.contentOffset) {
                return;
            }

            var offset = e.contentOffset.y;
            if(offset <= -65.0 && !pulling) {
                var t = Ti.UI.create2DMatrix();
                t = t.rotate(-180);
                pulling = true;
                arrow.animate({
                    transform: t,
                    duration: 180
                });
                statusLabel.text = "Lacher pour mettre à jour...";
            } else if(pulling && offset > -65.0 && offset < 0) {
                pulling = false;
                var t = Ti.UI.create2DMatrix();
                arrow.animate({
                    transform: t,
                    duration: 180
                });
                statusLabel.text = "Mise à jour en cours...";
            }
        });

        tableview.addEventListener('scrollEnd', function(e) {
            if(pulling && !reloading && e.contentOffset.y <= -65.0) {
                reloading = true;
                pulling = false;
                arrow.hide();
                actInd.show();
                statusLabel.text = "Chargement...";
                tableview.setContentInsets({
                    top: 60
                }, {
                    animated: true
                });
                arrow.transform = Ti.UI.create2DMatrix();

                beginReloading();
            }
        });
    }
    return self;
}

module.exports = PullToRefresh;
