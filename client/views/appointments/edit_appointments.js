Template.edit_appointments.helpers ({

    // controllers
    //appointments: function() {
        //
    //}

});

Template.edit_appointments.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var updated_appointments = {
            createdAt: tpl.find('#input_createdAt').value,
            patientId: tpl.find('#input_patientId').value,
            appointmentDate: tpl.find('#input_appointmentDate').value,
            appointmentTime: tpl.find('#input_appointmentTime').value,
            status: tpl.find('#input_status').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('update_appointments', this._id, updated_appointments);
        Router.go('appointments');

    }

});

