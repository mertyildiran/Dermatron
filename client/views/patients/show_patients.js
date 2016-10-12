Template.show_patients.helpers ({

    // controllers
    //patients: function() {
        //
    //}

});

globalPatientIdForNewVisit = "";

Template.show_patients.events ({

  'click #scheduleNewVisit': function () {
      globalPatientIdForNewVisit = Router.current().params._id;
  }

});
