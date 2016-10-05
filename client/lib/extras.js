Template.form_appointments.helpers ({

    patients: function() {
        return patients.find().fetch();
    },

    patientLookup: function(patientId) {
        return patients.find( { "_id": patientId } ).fetch()[0].name + patients.find( { "_id": patientId } ).fetch()[0].surname;
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
