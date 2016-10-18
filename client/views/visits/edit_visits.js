Template.edit_visits.helpers ({

    // controllers
    //visits: function() {
        //
    //}

});

Template.edit_visits.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var updated_visits = {
            patientId: tpl.find('#input_patientId').value,
            visitDate: tpl.find('#input_visitDate').value,
            visitTime: tpl.find('#input_visitTime').value,
            lesion: $('#input_lesion').val(),
            symptoms: $('#input_symptoms').val(),
            pathophysiology: $('#input_pathophysiology').val(),
            anatomicalLocation: tpl.find('#input_anatomicalLocation').value,
            diagnosis: $('#input_diagnosis').val(),
            prescription: $('#input_prescription').val(),
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('update_visits', this._id, updated_visits);
        Router.go('visits');

    }

});
