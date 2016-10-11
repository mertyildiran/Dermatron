Template.form_appointments.helpers ({

    patients: function() {
        return patients.find().fetch();
    },

    patientLookup: function(patientId) {
        if ( (patientId == null) && globalPatientIdForNewAppointment ) {
          $('#input_patientId option:selected').val(globalPatientIdForNewAppointment);
          patientId = globalPatientIdForNewAppointment;
          globalPatientIdForNewAppointment = '';
        }
        return patients.findOne(patientId).name + ' ' + patients.findOne(patientId).surname;
    },

    patientId: function(patientId) {
        if ( (patientId == null) && globalPatientIdForNewAppointment ) {
            return globalPatientIdForNewAppointment
        } else {
            return patientId
        }
    }

});

Template.form_appointments.onRendered(function () {

    $('.datepicker').pickadate({
      format: 'yyyy-mm-dd',
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 50 // Creates a dropdown of 15 years to control year
    });

    $('.timepicker').pickatime({
      autoclose: false,
      twelvehour: false
    });

    $(document).ready(function() {
      $('select').material_select();
    });

    $('.datepicker').val(appointments.findOne(Router.current().params._id).appointmentDate);

});

Template.form_patients.onRendered(function () {

    $('.datepicker').pickadate({
      format: 'yyyy-mm-dd',
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 250 // Creates a dropdown of 15 years to control year
    });

    $(document).ready(function() {
      $('select').material_select();
    });

    $('.datepicker').val(patients.findOne(Router.current().params._id).birthDate);

});

Template.index.onRendered(function () {

    scheduler.config.xml_date="%Y-%m-%d %H:%i";
    scheduler.init("scheduler_here", new Date());
    scheduler.load("./appointments.xml");

});
