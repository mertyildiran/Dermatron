Template.new_appointments.helpers ({

    // controllers
    //appointments: function() {
        //
    //}

});

Template.new_appointments.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var new_appointments = {
            createdAt: tpl.find('#input_createdAt').value,
            patientId: tpl.find('#input_patientId').value,
            appointmentDate: tpl.find('#input_appointmentDate').value,
            appointmentTime: tpl.find('#input_appointmentTime').value,
            appointmentReason: tpl.find('#input_appointmentReason').value,
            symptoms: tpl.find('#input_symptoms').value,
            diagnosis: tpl.find('#input_diagnosis').value,
            treatment: tpl.find('#input_treatment').value,
            status: tpl.find('#input_status').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('insert_appointments', new_appointments);
        Router.go('appointments');

    }

});

