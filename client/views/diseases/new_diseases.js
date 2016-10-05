Template.new_diseases.helpers ({

    // controllers
    //diseases: function() {
        //
    //}

});

Template.new_diseases.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var new_diseases = {
            name: tpl.find('#input_name').value,
            description: tpl.find('#input_description').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('insert_diseases', new_diseases);
        Router.go('diseases');

    }

});
