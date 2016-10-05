Template.show_appointments.helpers ({

  patientLookup: function(patientId) {
      return patients.find( { "_id": patientId } ).fetch()[0].name + patients.find( { "_id": patientId } ).fetch()[0].surname;
  }

});

Template.show_appointments.events ({

    // event handlers
    //'click #': function(evt, tpl) {
        //
    //}

});
