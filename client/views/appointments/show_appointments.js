Template.show_appointments.helpers ({

  patientLookup: function(patientId) {
      return patients.findOne(patientId).name + ' ' + patients.findOne(patientId).surname;
  }

});

Template.show_appointments.events ({

    // event handlers
    //'click #': function(evt, tpl) {
        //
    //}

});
