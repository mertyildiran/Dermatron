var _deps = new Tracker.Dependency;
var options = {limit: 10, sort: { createdAt: -1} };

Template.medicines.helpers ({

    // controllers
    tpl_info: function() {
        return medicines.find().count() + ' record(s) found. This is medicines template, find me at client/views/medicines';
    },

    medicines: function() {
        _deps.depend();
        return medicines.find({}, options).fetch();
    },

    invokeBeforeLoadMedicines: function () {
        searchTextMedicines.set('');
    }

});

Template.medicines.events ({

    // event handlers
    // delete the selected object
    'click #delete': function(evt, tpl) {
        Meteor.call('delete_medicines', this._id);
    },

    // filter function
    'keyup #filter_field': function (evt, tpl) {
        searchTextMedicines.set($('#filter_field').val());
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
                Meteor.call('delete_selected_medicines', selectedIds);
            }
        });
    },

    'click #loadMore': function () {
        options['limit'] += 10;
        _deps.changed();
        if (options['limit'] >= medicines.find().count()){
            $('#loadMore').text('Done');
            $('#loadMore').fadeOut();
        }

    },

    'click #loadReset': function () {
        options['limit'] = 10;
        _deps.changed();
        $('#filter_field').val('');
        searchTextMedicines.set('');
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
        if ($('#header-description').text()[$('#header-description').text().length - 1] == '▲' || $('#header-description').text()[$('#header-description').text().length - 1] == '▼') {
            $('#header-description').text($('#header-description').text().slice(0,-1));
        }
        if ($('#header-brand').text()[$('#header-brand').text().length - 1] == '▲' || $('#header-brand').text()[$('#header-brand').text().length - 1] == '▼') {
            $('#header-brand').text($('#header-brand').text().slice(0,-1));
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

    'click #header-description': function () {
        if (options['sort']['description'] == -1) {
            $('#header-description').text('description▲');
            options['sort'] = { description: 1};
            _deps.changed();
        } else {
            $('#header-description').text('description▼');
            options['sort'] = { description: -1};
            _deps.changed();
        }
    },

    'click #header-brand': function () {
        if (options['sort']['brand'] == -1) {
            $('#header-brand').text('brand▲');
            options['sort'] = { brand: 1};
            _deps.changed();
        } else {
            $('#header-brand').text('brand▼');
            options['sort'] = { brand: -1};
            _deps.changed();
        }
    },

});

