function Model(dic) {
    var joli = dic.joli;
    var m = {};

    var conferenceNewRecord = function(values) {
        if(!values) {
            values = {};
        }

        var data = {};

        joli.each(this.options.columns, function(colType, colName) {
            data[colName] = values[colName] || null;
        });
        var record = new joli.record(this).fromArray(data);

        record.isNew = function() {
            return true;
        };

        record.save();

        if(values && values.speakers) {
            joli.each(values.speakers, function(speaker_id, key) {
                var relation = new joli.record(joli.models.get('conference_speaker')).fromArray({
                    speaker_id: speaker_id,
                    conference_id: data.id
                });

                relation.isNew = function() {
                    return true;
                };
                relation.save();
            });
        }

        return record;
    };
    // conference model
    m.conference = new joli.apimodel({
        table: 'conference',
        columns: {
            id: 'INTEGER PRIMARY KEY',
            title: 'TEXT',
            start_at: 'TEXT',
            end_at: 'TEXT',
            type: 'TEXT',
            description: 'TEXT'
        },
        methods: {
            newRecord: conferenceNewRecord
        },
        objectMethods: {
            getSpeakers: function() {
                return new joli.query().select('speaker.*').from('speaker').join('conference_speaker', 'conference_speaker.speaker_id', 'speaker.id').where('conference_speaker.conference_id = ?', this.id).order('last_name asc').execute();
            }
        },
        url: Titanium.App.Properties.getString('api_url') + 'conference.json.php'
    });

    m.conference_speaker = new joli.model({
        table: 'conference_speaker',
        columns: {
            conference_id: 'INTEGER',
            speaker_id: 'INTEGER'
        }
    });

    // speaker model
    m.speaker = new joli.apimodel({
        table: 'speaker',
        columns: {
            id: 'INTEGER PRIMARY KEY',
            first_name: 'TEXT',
            last_name: 'TEXT',
            photo: 'TEXT',
            company: 'TEXT',
            biography: 'TEXT'
        },
        objectMethods: {
            getConferences: function() {
                return new joli.query().select('conference.*').from('conference').join('conference_speaker', 'conference_speaker.conference_id', 'conference.id').where('conference_speaker.speaker_id = ?', this.id).order('start_at asc').execute();
            },
            getFullName: function() {
                return this.first_name + ' ' + this.last_name;
            }
        },
        url: Titanium.App.Properties.getString('api_url') + 'speaker.json.php'
    });

    // table_updates model
    m.table_updates = new joli.model({
        table: 'table_updates',
        columns: {
            id: 'INTEGER',
            name: 'TEXT',
            updated_at: 'TEXT'
        }
    });

    return m;
};

module.exports = Model;
