Template.show_visits.helpers ({

  patientLookup: function(patientId) {
      return patients.findOne(patientId).name + ' ' + patients.findOne(patientId).surname;
  },

  status: function(_id) {
      visit = visits.findOne(_id);
      var time = visit.visitTime.split(/:/);
      var date = visit.visitDate.split(/-/);
      var d = new Date(date[0], date[1]-1, date[2], time[0], time[1], 0, 0);
      var start = d;
      d.setMinutes(d.getMinutes() + 5);
      var end = d;
      var now = new Date();
      if (start > now) {
          return "Future";
      } else if (end < now) {
          return "Past";
      } else {
          return "Now";
      }
  }

});

Template.show_visits.events ({

    // event handlers
    //'click #': function(evt, tpl) {
        //
    //}

});
