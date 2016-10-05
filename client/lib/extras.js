Template.form_appointments.helpers ({

    patients: function() {
        return patients.find().fetch();
    }

});

Router.onRun(function () {
    $(document).ready(function() {
      function materialSelect() {
          $('select').material_select();
      };
      setTimeout(materialSelect, 10);
    });
});
