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
