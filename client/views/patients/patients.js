var _deps = new Tracker.Dependency;
var options = {limit: 10, sort: { createdAt: -1} };

Template.patients.helpers ({

    // controllers
    tpl_info: function() {
        return patients.find().count() + ' record(s) found. This is patients template, find me at client/views/patients';
    },

    patients: function() {
        _deps.depend();
        return patients.find({}, options).fetch();
    },

    invokeBeforeLoadPatients: function () {
        searchTextPatients.set('');
    }

});

Template.patients.events ({

    // event handlers
    // delete the selected object
    'click #delete': function(evt, tpl) {
        Meteor.call('delete_patients', this._id);
    },

    // filter function
    'keyup #filter_field': function (evt, tpl) {
        searchTextPatients.set($('#filter_field').val());
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
                Meteor.call('delete_selected_patients', selectedIds);
            }
        });
    },

    'click #loadMore': function () {
        options['limit'] += 10;
        _deps.changed();
        if (options['limit'] >= patients.find().count()){
            $('#loadMore').text('Done');
            $('#loadMore').fadeOut();
        }

    },

    'click #loadReset': function () {
        options['limit'] = 10;
        _deps.changed();
        $('#filter_field').val('');
        searchTextPatients.set('');
        $('#loadMore').text('Load More');
        $('#loadMore').fadeIn();
    },

    'click th': function () {
        if ($('#header-createdAt').text()[$('#header-createdAt').text().length - 1] == '▲' || $('#header-createdAt').text()[$('#header-createdAt').text().length - 1] == '▼') {
            $('#header-createdAt').text($('#header-createdAt').text().slice(0,-1));
        }
        if ($('#header-name').text()[$('#header-name').text().length - 1] == '▲' || $('#header-name').text()[$('#header-name').text().length - 1] == '▼') {
            $('#header-name').text($('#header-name').text().slice(0,-1));
        }
        if ($('#header-surname').text()[$('#header-surname').text().length - 1] == '▲' || $('#header-surname').text()[$('#header-surname').text().length - 1] == '▼') {
            $('#header-surname').text($('#header-surname').text().slice(0,-1));
        }
        if ($('#header-gender').text()[$('#header-gender').text().length - 1] == '▲' || $('#header-gender').text()[$('#header-gender').text().length - 1] == '▼') {
            $('#header-gender').text($('#header-gender').text().slice(0,-1));
        }
        if ($('#header-birthDate').text()[$('#header-birthDate').text().length - 1] == '▲' || $('#header-birthDate').text()[$('#header-birthDate').text().length - 1] == '▼') {
            $('#header-birthDate').text($('#header-birthDate').text().slice(0,-1));
        }
        if ($('#header-nationalId').text()[$('#header-nationalId').text().length - 1] == '▲' || $('#header-nationalId').text()[$('#header-nationalId').text().length - 1] == '▼') {
            $('#header-nationalId').text($('#header-nationalId').text().slice(0,-1));
        }
        if ($('#header-socialSecurityType').text()[$('#header-socialSecurityType').text().length - 1] == '▲' || $('#header-socialSecurityType').text()[$('#header-socialSecurityType').text().length - 1] == '▼') {
            $('#header-socialSecurityType').text($('#header-socialSecurityType').text().slice(0,-1));
        }
        if ($('#header-socialSecurityNumber').text()[$('#header-socialSecurityNumber').text().length - 1] == '▲' || $('#header-socialSecurityNumber').text()[$('#header-socialSecurityNumber').text().length - 1] == '▼') {
            $('#header-socialSecurityNumber').text($('#header-socialSecurityNumber').text().slice(0,-1));
        }
        if ($('#header-isPatientDisabled').text()[$('#header-isPatientDisabled').text().length - 1] == '▲' || $('#header-isPatientDisabled').text()[$('#header-isPatientDisabled').text().length - 1] == '▼') {
            $('#header-isPatientDisabled').text($('#header-isPatientDisabled').text().slice(0,-1));
        }
        if ($('#header-bloodGroup').text()[$('#header-bloodGroup').text().length - 1] == '▲' || $('#header-bloodGroup').text()[$('#header-bloodGroup').text().length - 1] == '▼') {
            $('#header-bloodGroup').text($('#header-bloodGroup').text().slice(0,-1));
        }
        if ($('#header-email').text()[$('#header-email').text().length - 1] == '▲' || $('#header-email').text()[$('#header-email').text().length - 1] == '▼') {
            $('#header-email').text($('#header-email').text().slice(0,-1));
        }
        if ($('#header-phone').text()[$('#header-phone').text().length - 1] == '▲' || $('#header-phone').text()[$('#header-phone').text().length - 1] == '▼') {
            $('#header-phone').text($('#header-phone').text().slice(0,-1));
        }
        if ($('#header-address').text()[$('#header-address').text().length - 1] == '▲' || $('#header-address').text()[$('#header-address').text().length - 1] == '▼') {
            $('#header-address').text($('#header-address').text().slice(0,-1));
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

    'click #header-name': function () {
        if (options['sort']['name'] == -1) {
            $('#header-name').text('name▲');
            options['sort'] = { name: 1};
            _deps.changed();
        } else {
            $('#header-name').text('name▼');
            options['sort'] = { name: -1};
            _deps.changed();
        }
    },

    'click #header-surname': function () {
        if (options['sort']['surname'] == -1) {
            $('#header-surname').text('surname▲');
            options['sort'] = { surname: 1};
            _deps.changed();
        } else {
            $('#header-surname').text('surname▼');
            options['sort'] = { surname: -1};
            _deps.changed();
        }
    },

    'click #header-gender': function () {
        if (options['sort']['gender'] == -1) {
            $('#header-gender').text('gender▲');
            options['sort'] = { gender: 1};
            _deps.changed();
        } else {
            $('#header-gender').text('gender▼');
            options['sort'] = { gender: -1};
            _deps.changed();
        }
    },

    'click #header-birthDate': function () {
        if (options['sort']['birthDate'] == -1) {
            $('#header-birthDate').text('birthDate▲');
            options['sort'] = { birthDate: 1};
            _deps.changed();
        } else {
            $('#header-birthDate').text('birthDate▼');
            options['sort'] = { birthDate: -1};
            _deps.changed();
        }
    },

    'click #header-nationalId': function () {
        if (options['sort']['nationalId'] == -1) {
            $('#header-nationalId').text('nationalId▲');
            options['sort'] = { nationalId: 1};
            _deps.changed();
        } else {
            $('#header-nationalId').text('nationalId▼');
            options['sort'] = { nationalId: -1};
            _deps.changed();
        }
    },

    'click #header-socialSecurityType': function () {
        if (options['sort']['socialSecurityType'] == -1) {
            $('#header-socialSecurityType').text('socialSecurityType▲');
            options['sort'] = { socialSecurityType: 1};
            _deps.changed();
        } else {
            $('#header-socialSecurityType').text('socialSecurityType▼');
            options['sort'] = { socialSecurityType: -1};
            _deps.changed();
        }
    },

    'click #header-socialSecurityNumber': function () {
        if (options['sort']['socialSecurityNumber'] == -1) {
            $('#header-socialSecurityNumber').text('socialSecurityNumber▲');
            options['sort'] = { socialSecurityNumber: 1};
            _deps.changed();
        } else {
            $('#header-socialSecurityNumber').text('socialSecurityNumber▼');
            options['sort'] = { socialSecurityNumber: -1};
            _deps.changed();
        }
    },

    'click #header-isPatientDisabled': function () {
        if (options['sort']['isPatientDisabled'] == -1) {
            $('#header-isPatientDisabled').text('isPatientDisabled▲');
            options['sort'] = { isPatientDisabled: 1};
            _deps.changed();
        } else {
            $('#header-isPatientDisabled').text('isPatientDisabled▼');
            options['sort'] = { isPatientDisabled: -1};
            _deps.changed();
        }
    },

    'click #header-bloodGroup': function () {
        if (options['sort']['bloodGroup'] == -1) {
            $('#header-bloodGroup').text('bloodGroup▲');
            options['sort'] = { bloodGroup: 1};
            _deps.changed();
        } else {
            $('#header-bloodGroup').text('bloodGroup▼');
            options['sort'] = { bloodGroup: -1};
            _deps.changed();
        }
    },

    'click #header-email': function () {
        if (options['sort']['email'] == -1) {
            $('#header-email').text('email▲');
            options['sort'] = { email: 1};
            _deps.changed();
        } else {
            $('#header-email').text('email▼');
            options['sort'] = { email: -1};
            _deps.changed();
        }
    },

    'click #header-phone': function () {
        if (options['sort']['phone'] == -1) {
            $('#header-phone').text('phone▲');
            options['sort'] = { phone: 1};
            _deps.changed();
        } else {
            $('#header-phone').text('phone▼');
            options['sort'] = { phone: -1};
            _deps.changed();
        }
    },

    'click #header-address': function () {
        if (options['sort']['address'] == -1) {
            $('#header-address').text('address▲');
            options['sort'] = { address: 1};
            _deps.changed();
        } else {
            $('#header-address').text('address▼');
            options['sort'] = { address: -1};
            _deps.changed();
        }
    },

});
