Template.person.helpers ({

    // controllers
    tpl_info: function() {
        return 'This is person template, find me at client/views/person';
    },

    person: function() {
        return person.find().fetch();
    }

});

Template.person.events ({

    // event handlers
    // delete the selected object
    'click #delete': function(evt, tpl) {
        Meteor.call('delete_person', this._id);
    },

    // filter function
    'keyup #filter_field': function (evt, tpl) {
        $("td").filter(function () {
            var word = tpl.find('#filter_field').value;
            if (word !== '') {
                $('.table-responsive tbody>tr').hide();
                $('.table-responsive td').filter(function () {
                    return $(this).text().toLowerCase().indexOf(word.toLowerCase()) > -1
                }).parent('tr').show();
            }
            else {
                $('.table-responsive tbody>tr').show();
            }
            return false;
        })
    },

    'click #checkAll': function (evt, tpl) {
        $('.checkthis').prop('checked', evt.target.checked);
    },

    'click #deleteAll': function () {
        // get the id of the checked rows
        $('input:checkbox:checked').filter(function(){
            var selectedIds = $(this).closest('tr').attr('id');
            if (selectedIds !== undefined) {
                Meteor.call('delete_selected_person', selectedIds);
            }
        });
    }

});

