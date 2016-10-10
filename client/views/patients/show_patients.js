Template.show_patients.helpers ({

    // controllers
    //patients: function() {
        //
    //}

});

globalPatientIdForNewAppointment = "";

Template.show_patients.events ({

  'click #scheduleNewAppointment': function () {
      globalPatientIdForNewAppointment = Router.current().params._id;
  }

});
