Template.edit_patients.helpers ({

    // controllers
    //patients: function() {
        //
    //}

});

Template.edit_patients.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var updated_patients = {
            createdAt: tpl.find('#input_createdAt').value,
            name: tpl.find('#input_name').value,
            surname: tpl.find('#input_surname').value,
            gender: tpl.find('#input_gender').value,
            birthDate: tpl.find('#input_birthDate').value,
            nationalId: tpl.find('#input_nationalId').value,
            socialSecurityType: tpl.find('#input_socialSecurityType').value,
            socialSecurityNumber: tpl.find('#input_socialSecurityNumber').value,
            isPatientDisabled: tpl.find('#input_isPatientDisabled').value,
            bloodGroup: tpl.find('#input_bloodGroup').value,
            email: tpl.find('#input_email').value,
            phone: tpl.find('#input_phone').value,
            address: tpl.find('#input_address').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('update_patients', this._id, updated_patients);
        Router.go('patients');

    }

});

