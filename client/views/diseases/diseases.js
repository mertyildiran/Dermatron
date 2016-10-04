var _deps = new Tracker.Dependency;
var options = {limit: 10, sort: { createdAt: -1} };

Template.diseases.helpers ({

    // controllers
    tpl_info: function() {
        return diseases.find().count() + ' record(s) found. This is diseases template, find me at client/views/diseases';
    },

    diseases: function() {
        _deps.depend();
        return diseases.find({}, options).fetch();
    },

    invokeBeforeLoadDiseases: function () {
        searchTextDiseases.set('');
    }

});

Template.diseases.events ({

    // event handlers
    // delete the selected object
    'click #delete': function(evt, tpl) {
        Meteor.call('delete_diseases', this._id);
    },

    // filter function
    'keyup #filter_field': function (evt, tpl) {
        searchTextDiseases.set($('#filter_field').val());
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
                Meteor.call('delete_selected_diseases', selectedIds);
            }
        });
    },

    'click #loadMore': function () {
        options['limit'] += 10;
        _deps.changed();
        if (options['limit'] >= diseases.find().count()){
            $('#loadMore').text('Done');
            $('#loadMore').fadeOut();
        }

    },

    'click #loadReset': function () {
        options['limit'] = 10;
        _deps.changed();
        $('#filter_field').val('');
        searchTextDiseases.set('');
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

});

