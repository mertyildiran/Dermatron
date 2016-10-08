Template.form_appointments.helpers ({

    patients: function() {
        return patients.find().fetch();
    },

    patientLookup: function(patientId) {
        return patients.findOne(patientId).name + ' ' + patients.findOne(patientId).surname;
    }

});

Template.form_appointments.onRendered(function () {

    blazeDate = $('.datepicker').val();

    $('.datepicker').pickadate({
      format: 'yyyy-mm-dd',
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
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
