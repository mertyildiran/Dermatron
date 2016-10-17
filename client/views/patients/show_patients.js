Template.show_patients.helpers ({

    // controllers
    totalVisits: function(_id) {
        return visits.find({ patientId: _id }).count();
    }

});

globalPatientIdForNewVisit = "";

Template.show_patients.events ({

  'click #scheduleNewVisit': function () {
      globalPatientIdForNewVisit = Router.current().params._id;
  }

});
