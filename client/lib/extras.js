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

    scheduler.config.multi_day = true;
	var pizza_size = [
		{ key: 1, label: 'Small' },
		{ key: 2, label: 'Medium' },
		{ key: 3, label: 'Large' }
	];

	scheduler.locale.labels.section_text = 'Text';
	scheduler.locale.labels.section_checkbox = 'Checkbox';
	scheduler.locale.labels.section_radiobutton = 'Radiobutton';
	scheduler.locale.labels.section_select = 'Select';
	scheduler.locale.labels.section_template = 'Template';

	scheduler.config.lightbox.sections = [
		{ name: "text", height: 50, map_to: "text", type: "textarea", focus: true },
		{ name: "checkbox", map_to: "single_checkbox", type: "checkbox", checked_value: "registrable", unchecked_value: "unchecked" },
		{ name: "radiobutton", height: 58, options: pizza_size, map_to: "radiobutton_option", type: "radio", vertical: true },
		{ name: "select", height: 21, map_to: "type", type: "select", options: pizza_size },
		{ name: "template", height: 21, map_to: "text", type: "template" },
		{ name: "time", height: 72, type: "calendar_time", map_to: "auto" },
		{ name: "time", height: 72, type: "time", map_to: "auto"}
	];

	scheduler.config.full_day = true;
    scheduler.config.first_hour = 7;
    scheduler.config.last_hour = 19;

    scheduler.xy.scale_height=30;

    scheduler.config.xml_date="%Y-%m-%d %H:%i";
    scheduler.init("scheduler_here", new Date());
    scheduler.load("./appointments.xml");

});
