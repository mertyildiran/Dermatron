Template.new_visits.helpers ({

    // controllers
    //visits: function() {
        //
    //}

});

Template.new_visits.events ({
    // event handlers
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var new_visits = {
            patientId: tpl.find('#input_patientId').value,
            visitDate: tpl.find('#input_visitDate').value,
            visitTime: tpl.find('#input_visitTime').value,
            reasonToVisit: tpl.find('#input_reasonToVisit').value,
            symptoms: $('#input_symptoms').val(),
            diagnosis: tpl.find('#input_diagnosis').value,
            treatment: tpl.find('#input_treatment').value,
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('insert_visits', new_visits);
        Router.go('visits');

    }

});
