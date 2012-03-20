function NewsList(dic) {
    var self = Ti.UI.createTableView({
        height: '100%',
        width: '100%',
        data: []
    });

    return self;
}

module.exports = NewsList;
