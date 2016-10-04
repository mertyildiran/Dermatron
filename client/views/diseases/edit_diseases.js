Template.edit_diseases.helpers ({

    // controllers
    //diseases: function() {
        //
    //}

});

Template.edit_diseases.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var updated_diseases = {
            createdAt: tpl.find('#input_createdAt').value,
            name: tpl.find('#input_name').value,
            description: tpl.find('#input_description').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('update_diseases', this._id, updated_diseases);
        Router.go('diseases');

    }

});

