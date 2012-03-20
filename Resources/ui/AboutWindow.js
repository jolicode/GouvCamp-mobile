function AboutWindow(dic) {
    var helper = dic.helper;
    var models = dic.joli.models.get();

    var self = Ti.UI.createWindow({
        title: 'À propos',
        backgroundImage: '/images/bg.png',
        navBarHidden: false,
        barColor: '#3693cc'
    });
    var view = Titanium.UI.createView({
        height: 'auto',
        layout: 'vertical',
        left: 0,
        right: 0,
        top: 0,
        bottom: 20
    });

    var title = Ti.UI.createLabel({
        text: 'Qu\'est-ce que "Parlement et citoyens" ?',
        font: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        textAlign: 'left',
        color: '#000',
        height: 'auto',
        left: 10,
        top: 10,
        right: 10,
        touchEnabled: false
    });
    view.add(title);

    var label = Ti.UI.createLabel({
        text: 'Vous êtes un élu, un citoyen, un agent public, un journaliste, un militant associatif, un syndicaliste, un développeur, un designer...\n\nVous pensez que la participation et la transparence sont les clés de l\'efficacité de l\'action publique et de la confiance des citoyens envers leurs représentants.\n\nLa collaboration est dans votre ADN et vous êtes disposé à mettre vos compétences, votre expérience et vos réseaux au service d\'une cause commune.\n\nVenez participer à la création de Parlement et Citoyens, une plateforme open source qui permettra aux parlementaires d\'associer les parties prenantes à la rédaction de leurs propositions de lois.',
        font: {
            fontSize: 14,
        },
        textAlign: 'left',
        color: '#000',
        height: 'auto',
        left: 10,
        top: 10,
        right: 10,
        touchEnabled: false
    });
    view.add(label);


    var partners = Ti.UI.createLabel({
        text: 'Partenaires du projet',
        font: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        textAlign: 'left',
        color: '#000',
        height: 'auto',
        left: 10,
        top: 20,
        bottom: 50,
        right: 10,
        touchEnabled: false
    });
    view.add(partners);



    // wrap up everything
    var row = Ti.UI.createTableViewRow({
        height: 'auto',
        className: 'row'
    });
    row.add(view);
    var tableview = Titanium.UI.createTableView({
        backgroundColor: 'transparent',
        separatorColor: 'transparent',
        data: [row]
    });
    self.add(tableview);
    return self;
};

module.exports = AboutWindow;
