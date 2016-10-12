Template.show_visits.helpers ({

  patientLookup: function(patientId) {
      return patients.findOne(patientId).name + ' ' + patients.findOne(patientId).surname;
  }

});

Template.show_visits.events ({

    // event handlers
    //'click #': function(evt, tpl) {
        //
    //}

});
