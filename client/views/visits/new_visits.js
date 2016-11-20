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

        var patientId = $('#input_patientId').val();
        var new_visits = {
            patientId: patientId,
            patientName: patients.findOne(patientId).name + ' ' + patients.findOne(patientId).surname,
            visitDateTime: tpl.find('#input_visitDate').value + ' ' + tpl.find('#input_visitTime').value,
            lesion: $('#input_lesion').val(),
            symptoms: $('#input_symptoms').val(),
            pathophysiology: $('#input_pathophysiology').val(),
            anatomicalLocation: tpl.find('#input_anatomicalLocation').value,
            image: $('div#capturedImage').attr('value'),
            captionImage: $('div#capturedImage figcaption#captured p').html(),
            captionLastVisit: $('div#capturedImage figcaption#last-visit p').html(),
            diagnosis: $('#input_diagnosis').val(),
            prescription: $('#input_prescription').val(),
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('insert_visits', new_visits);
        Router.go('visits');

    }

});
