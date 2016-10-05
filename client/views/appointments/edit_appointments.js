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
            patientId: tpl.find('#input_patientId').value,
            appointmentDatetime: tpl.find('#input_appointmentDatetime').value,
            appointmentReason: tpl.find('#input_appointmentReason').value,
            symptoms: tpl.find('#input_symptoms').value,
            diagnosis: tpl.find('#input_diagnosis').value,
            treatment: tpl.find('#input_treatment').value,
            status: tpl.find('#input_status').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('update_appointments', this._id, updated_appointments);
        Router.go('appointments');

    }

});
