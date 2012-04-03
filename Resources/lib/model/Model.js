function Model(dic) {
    var joli = dic.joli;
    var m = {};

    var attendeeSaveRecords = function(items) {
        var i = 0;
        var new_count = 0;
        var updated_count = 0;
        items = joli.jsonParse(items);
        items = items['attendees'];
        table = joli.models.get(this.table);

        // create transaction
//        var transaction = new joli.transaction();
//        transaction.begin();

        while(i < items.length) {
            var item = items[i]['attendee'];
            if(!table.exists(item.id)) {
                table.newRecord(item).save();
                new_count++;
            } else {
                // update the record
                var record = table.findOneById(item.id);
                record.fromArray(item).save();
                updated_count++;
            }
            i++;
        }

//        transaction.commit();

        Ti.App.fireEvent('joli.records.saved', {
            table: table.table,
            nb_new: new_count,
            nb_updated: updated_count
        });
    };

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

    m.attendee = new joli.apimodel({
        table: 'attendee',
        columns: {
            id: 'INTEGER PRIMARY KEY',
            first_name: 'TEXT',
            last_name: 'TEXT',
            company: 'TEXT',
            job_title: 'TEXT'
        },
        objectMethods: {
            getFullName: function() {
                return this.first_name + ' ' + this.last_name.toUpperCase();
            }
        },
        saveRecords: attendeeSaveRecords,
        url: 'https://www.eventbrite.com/json/event_list_attendees?app_key=5H6JUD36UAT56RETBX&id=3143715939'
    });

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
                return this.first_name + ' ' + this.last_name.toUpperCase();
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
