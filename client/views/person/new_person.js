Template.new_person.helpers ({

    // controllers
    //person: function() {
        //
    //}

});

Template.new_person.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var new_person = {
            name: tpl.find('#input_name').value,
            registered: tpl.find('#input_registered').value,
            isAdmin: tpl.find('#input_isAdmin').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('insert_person', new_person);
        Router.go('person');

    }

});

