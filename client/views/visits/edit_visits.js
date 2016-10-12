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
            reasonToVisit: tpl.find('#input_reasonToVisit').value,
            symptoms: tpl.find('#input_symptoms').value,
            diagnosis: tpl.find('#input_diagnosis').value,
            treatment: tpl.find('#input_treatment').value,
            status: tpl.find('#input_status').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('update_visits', this._id, updated_visits);
        Router.go('visits');

    }

});
