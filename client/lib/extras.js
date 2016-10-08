Template.form_appointments.helpers ({

    patients: function() {
        return patients.find().fetch();
    },

    patientLookup: function(patientId) {
        return patients.find( { "_id": patientId } ).fetch()[0].name + patients.find( { "_id": patientId } ).fetch()[0].surname;
    }

});

Template.form_appointments.onRendered(function () {

    $('.datepicker').pickadate({
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

});
