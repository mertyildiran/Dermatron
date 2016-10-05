var _deps = new Tracker.Dependency;
var options = {limit: 10, sort: { createdAt: -1} };

Template.appointments.helpers ({

    // controllers
    tpl_info: function() {
        return appointments.find().count() + ' record(s) found. This is appointments template, find me at client/views/appointments';
    },

    appointments: function() {
        _deps.depend();
        return appointments.find({}, options).fetch();
    },

    invokeBeforeLoadAppointments: function () {
        searchTextAppointments.set('');
    }

});

Template.appointments.events ({

    // event handlers
    // delete the selected object
    'click #delete': function(evt, tpl) {
        Meteor.call('delete_appointments', this._id);
    },

    // filter function
    'keyup #filter_field': function (evt, tpl) {
        searchTextAppointments.set($('#filter_field').val());
        $('#loadMore').text('Load More');
        $('#loadMore').fadeIn();
    },

    'click #checkAll': function (evt, tpl) {
        $('.checkthis').prop('checked', evt.target.checked);
    },

    'click #deleteAll': function () {
        // get the id of the checked rows
        $('input:checkbox:checked').filter(function(){
            var selectedIds = $(this).closest('tr').attr('id');
            if (selectedIds !== undefined) {
                Meteor.call('delete_selected_appointments', selectedIds);
            }
        });
    },

    'click #loadMore': function () {
        options['limit'] += 10;
        _deps.changed();
        if (options['limit'] >= appointments.find().count()){
            $('#loadMore').text('Done');
            $('#loadMore').fadeOut();
        }

    },

    'click #loadReset': function () {
        options['limit'] = 10;
        _deps.changed();
        $('#filter_field').val('');
        searchTextAppointments.set('');
        $('#loadMore').text('Load More');
        $('#loadMore').fadeIn();
    },

    'click th': function () {
        if ($('#header-createdAt').text()[$('#header-createdAt').text().length - 1] == '▲' || $('#header-createdAt').text()[$('#header-createdAt').text().length - 1] == '▼') {
            $('#header-createdAt').text($('#header-createdAt').text().slice(0,-1));
        }
        if ($('#header-patientId').text()[$('#header-patientId').text().length - 1] == '▲' || $('#header-patientId').text()[$('#header-patientId').text().length - 1] == '▼') {
            $('#header-patientId').text($('#header-patientId').text().slice(0,-1));
        }
        if ($('#header-patientName').text()[$('#header-patientName').text().length - 1] == '▲' || $('#header-patientName').text()[$('#header-patientName').text().length - 1] == '▼') {
            $('#header-patientName').text($('#header-patientName').text().slice(0,-1));
        }
        if ($('#header-appointmentDatetime').text()[$('#header-appointmentDatetime').text().length - 1] == '▲' || $('#header-appointmentDatetime').text()[$('#header-appointmentDatetime').text().length - 1] == '▼') {
            $('#header-appointmentDatetime').text($('#header-appointmentDatetime').text().slice(0,-1));
        }
        if ($('#header-appointmentReason').text()[$('#header-appointmentReason').text().length - 1] == '▲' || $('#header-appointmentReason').text()[$('#header-appointmentReason').text().length - 1] == '▼') {
            $('#header-appointmentReason').text($('#header-appointmentReason').text().slice(0,-1));
        }
        if ($('#header-symptoms').text()[$('#header-symptoms').text().length - 1] == '▲' || $('#header-symptoms').text()[$('#header-symptoms').text().length - 1] == '▼') {
            $('#header-symptoms').text($('#header-symptoms').text().slice(0,-1));
        }
        if ($('#header-diagnosis').text()[$('#header-diagnosis').text().length - 1] == '▲' || $('#header-diagnosis').text()[$('#header-diagnosis').text().length - 1] == '▼') {
            $('#header-diagnosis').text($('#header-diagnosis').text().slice(0,-1));
        }
        if ($('#header-treatment').text()[$('#header-treatment').text().length - 1] == '▲' || $('#header-treatment').text()[$('#header-treatment').text().length - 1] == '▼') {
            $('#header-treatment').text($('#header-treatment').text().slice(0,-1));
        }
        if ($('#header-status').text()[$('#header-status').text().length - 1] == '▲' || $('#header-status').text()[$('#header-status').text().length - 1] == '▼') {
            $('#header-status').text($('#header-status').text().slice(0,-1));
        }
  },

    'click #header-createdAt': function () {
        if (options['sort']['createdAt'] == -1) {
            $('#header-createdAt').text('createdAt▲');
            options['sort'] = { createdAt: 1};
            _deps.changed();
        } else {
            $('#header-createdAt').text('createdAt▼');
            options['sort'] = { createdAt: -1};
            _deps.changed();
        }
    },

    'click #header-patientId': function () {
        if (options['sort']['patientId'] == -1) {
            $('#header-patientId').text('patientId▲');
            options['sort'] = { patientId: 1};
            _deps.changed();
        } else {
            $('#header-patientId').text('patientId▼');
            options['sort'] = { patientId: -1};
            _deps.changed();
        }
    },

    'click #header-patientName': function () {
        if (options['sort']['patientName'] == -1) {
            $('#header-patientName').text('patientName▲');
            options['sort'] = { patientName: 1};
            _deps.changed();
        } else {
            $('#header-patientName').text('patientName▼');
            options['sort'] = { patientName: -1};
            _deps.changed();
        }
    },

    'click #header-appointmentDatetime': function () {
        if (options['sort']['appointmentDatetime'] == -1) {
            $('#header-appointmentDatetime').text('appointmentDatetime▲');
            options['sort'] = { appointmentDatetime: 1};
            _deps.changed();
        } else {
            $('#header-appointmentDatetime').text('appointmentDatetime▼');
            options['sort'] = { appointmentDatetime: -1};
            _deps.changed();
        }
    },

    'click #header-appointmentReason': function () {
        if (options['sort']['appointmentReason'] == -1) {
            $('#header-appointmentReason').text('appointmentReason▲');
            options['sort'] = { appointmentReason: 1};
            _deps.changed();
        } else {
            $('#header-appointmentReason').text('appointmentReason▼');
            options['sort'] = { appointmentReason: -1};
            _deps.changed();
        }
    },

    'click #header-symptoms': function () {
        if (options['sort']['symptoms'] == -1) {
            $('#header-symptoms').text('symptoms▲');
            options['sort'] = { symptoms: 1};
            _deps.changed();
        } else {
            $('#header-symptoms').text('symptoms▼');
            options['sort'] = { symptoms: -1};
            _deps.changed();
        }
    },

    'click #header-diagnosis': function () {
        if (options['sort']['diagnosis'] == -1) {
            $('#header-diagnosis').text('diagnosis▲');
            options['sort'] = { diagnosis: 1};
            _deps.changed();
        } else {
            $('#header-diagnosis').text('diagnosis▼');
            options['sort'] = { diagnosis: -1};
            _deps.changed();
        }
    },

    'click #header-treatment': function () {
        if (options['sort']['treatment'] == -1) {
            $('#header-treatment').text('treatment▲');
            options['sort'] = { treatment: 1};
            _deps.changed();
        } else {
            $('#header-treatment').text('treatment▼');
            options['sort'] = { treatment: -1};
            _deps.changed();
        }
    },

    'click #header-status': function () {
        if (options['sort']['status'] == -1) {
            $('#header-status').text('status▲');
            options['sort'] = { status: 1};
            _deps.changed();
        } else {
            $('#header-status').text('status▼');
            options['sort'] = { status: -1};
            _deps.changed();
        }
    },

});
