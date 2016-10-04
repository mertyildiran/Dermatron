Template.edit_medicines.helpers ({

    // controllers
    //medicines: function() {
        //
    //}

});

Template.edit_medicines.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var updated_medicines = {
            createdAt: tpl.find('#input_createdAt').value,
            name: tpl.find('#input_name').value,
            description: tpl.find('#input_description').value,
            brand: tpl.find('#input_brand').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('update_medicines', this._id, updated_medicines);
        Router.go('medicines');

    }

});

