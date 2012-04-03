function AboutView(url) {
    return Titanium.UI.createWebView({
        url: url,
        left: 0,
        right: 0,
        top: 0,
        bottom: 20
    });
}

module.exports = AboutView;