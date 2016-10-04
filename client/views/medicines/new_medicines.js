Template.new_medicines.helpers ({

    // controllers
    //medicines: function() {
        //
    //}

});

Template.new_medicines.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var new_medicines = {
            createdAt: tpl.find('#input_createdAt').value,
            name: tpl.find('#input_name').value,
            description: tpl.find('#input_description').value,
            brand: tpl.find('#input_brand').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('insert_medicines', new_medicines);
        Router.go('medicines');

    }

});

