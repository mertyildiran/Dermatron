Template.form_visits.helpers ({

    patients: function() {
        return patients.find().fetch();
    },

    patientLookup: function(patientId) {
        if ( (patientId == null) && globalPatientIdForNewVisit ) {
          $('#input_patientId option:selected').val(globalPatientIdForNewVisit);
          patientId = globalPatientIdForNewVisit;
          globalPatientIdForNewVisit = '';
        }
        if (patientId) {
            return patients.findOne(patientId).name + ' ' + patients.findOne(patientId).surname;
        } else {
            return "";
        }
    },

    patientIdFixer: function(patientId) {
        if ( (patientId == null) && globalPatientIdForNewVisit ) {
            return globalPatientIdForNewVisit
        } else {
            return patientId
        }
    }

});

Template.form_visits.onRendered(function () {

    $('.datepicker').pickadate({
      format: 'yyyy-mm-dd',
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 50 // Creates a dropdown of 15 years to control year
    });

    $('.timepicker').pickatime({
      autoclose: false,
      twelvehour: false
    });

    if ($('.multiple-select option:selected').val() == "") {
        $('.multiple-select option:selected').prop('disabled', true);
    }

    $(document).ready(function() {
      $('select').material_select();
    });

    if (Router.current().params._id) {
        $('.datepicker').val(visits.findOne(Router.current().params._id).visitDate);
    }

    var images = new Array()
	function preload() {
		for (i = 0; i < preload.arguments.length; i++) {
			images[i] = new Image()
			images[i].src = preload.arguments[i]
		}
	}

    preload('/image-map/male-mesh/head.png', '/image-map/male-mesh/full-body-back.png', '/image-map/male-mesh/trunk.png', '/image-map/male-mesh/upper-limbs.png', '/image-map/male-mesh/anogenital-region.png', '/image-map/male-mesh/lower-limbs.png');

    if ($('#input_patientId option:selected').val()) {
        if ( patients.findOne($('#input_patientId option:selected').val()).gender == 'Female' ) {
            FORM_VISITS_GENDER = 'female';
        } else if ( patients.findOne($('#input_patientId option:selected').val()).gender == 'Male' ) {
            FORM_VISITS_GENDER = 'male';
        }
    } else {
        FORM_VISITS_GENDER = 'male';
    }

    $( '<img src="/image-map/' + FORM_VISITS_GENDER + '-mesh/full-body.png" class="anatomic-map" usemap="#' + FORM_VISITS_GENDER + '-full-body">' ).insertAfter( "input#input_anatomicalLocation" );

    $('img.anatomic-map').maphilight();

});

Template.form_visits.events ({

    'change #input_patientId': function () {
        if ($('#input_patientId option:selected').val()) {
            if ( patients.findOne($('#input_patientId option:selected').val()).gender == 'Female' ) {
                FORM_VISITS_GENDER = 'female';
            } else if ( patients.findOne($('#input_patientId option:selected').val()).gender == 'Male' ) {
                FORM_VISITS_GENDER = 'male';
            }
        }
        $('#input_anatomicalLocation').val('');
        $('div.anatomic-map').remove();
        $( '<img src="/image-map/' + FORM_VISITS_GENDER + '-mesh/full-body.png" class="anatomic-map" usemap="#' + FORM_VISITS_GENDER + '-full-body">' ).insertAfter( "input#input_anatomicalLocation" );
        $('img.anatomic-map').maphilight();
        $('div.fixed-action-btn').css('bottom', '10px');
    },

    // Horizontal FAB Buttons START

    'click a#anatomicalLocationDone': function () {
        $('div.anatomic-map').remove();
        $('div.fixed-action-btn').css('bottom', '0px');
    },

    'click a#anatomicalLocationBackside': function () {
        $('#input_anatomicalLocation').val('');
        $('div.anatomic-map').remove();
        $( '<img src="/image-map/' + FORM_VISITS_GENDER + '-mesh/full-body-back.png" class="anatomic-map" usemap="#' + FORM_VISITS_GENDER + '-full-body-back">' ).insertAfter( "input#input_anatomicalLocation" );
        $('img.anatomic-map').maphilight();
        $('div.fixed-action-btn').css('bottom', '10px');
    },

    'click a#anatomicalLocationReset': function () {
        $('#input_anatomicalLocation').val('');
        $('div.anatomic-map').remove();
        $( '<img src="/image-map/' + FORM_VISITS_GENDER + '-mesh/full-body.png" class="anatomic-map" usemap="#' + FORM_VISITS_GENDER + '-full-body">' ).insertAfter( "input#input_anatomicalLocation" );
        $('img.anatomic-map').maphilight();
        $('div.fixed-action-btn').css('bottom', '10px');
    },

    // Horizontal FAB Buttons END

    // Generic area click events START

    'click area.level1': function (event) {
        $('#input_anatomicalLocation').val(event.currentTarget.title);
        $('div.anatomic-map').remove();
        $( '<img src="/image-map/' + FORM_VISITS_GENDER + '-mesh/' + event.currentTarget.id + '.png" class="anatomic-map" usemap="#' + FORM_VISITS_GENDER + '-' + event.currentTarget.id + '">' ).insertAfter( "input#input_anatomicalLocation" );
        $('img.anatomic-map').maphilight();
    },

    'click area.level1-back': function (event) {
        $('#input_anatomicalLocation').val(event.currentTarget.title);
        $('div.anatomic-map').remove();
        $('div.fixed-action-btn').css('bottom', '0px');
    },

    'click area.level2': function (event) {
        $('#input_anatomicalLocation').val($('#input_anatomicalLocation').val() + ' > ' + event.currentTarget.title);
        $('div.anatomic-map').remove();
        $('div.fixed-action-btn').css('bottom', '0px');
    },

    // Generic area click events END

    'click #captureButton': function () {
        var cameraOptions = {
          width: 800,
          height: 600
        };

        MeteorCamera.getPicture(cameraOptions, function (error, data) {
            $('img#capturedImage').attr('src', data);
            if ($('#input_lesion').val() && $('#input_symptoms').val() && $('#input_pathophysiology').val() && $('#input_anatomicalLocation').val()) {

                var lesionParams = $('#input_lesion').val().toString().split(',');
                var lesionString = 'lesions=' + LESIONS_DICT[lesionParams[0]];
                lesionParams.shift();
                lesionParams.forEach(function(element, index, array) {
                    lesionString += '|' + LESIONS_DICT[element];
                });

                var symptomsParams = $('#input_symptoms').val().toString().split(',');
                var symptomsString = 'symptoms=' + SYMPTOMS_DICT[symptomsParams[0]];
                symptomsParams.shift();
                symptomsParams.forEach(function(element, index, array) {
                    symptomsString += '|' + SYMPTOMS_DICT[element];
                });

                var pathosParams = $('#input_pathophysiology').val().toString().split(',');
                var pathosString = 'pathos=' + PATHOS_DICT[pathosParams[0]];
                pathosParams.shift();
                pathosParams.forEach(function(element, index, array) {
                    pathosString += '|' + PATHOS_DICT[element];
                });

                var anatomicalParams = $('#input_anatomicalLocation').val().toString().split(',');
                var anatomicalString = 'localization=' + ANATOMICAL_DICT[anatomicalParams[0]];
                anatomicalParams.shift();
                anatomicalParams.forEach(function(element, index, array) {
                    anatomicalString += '|' + ANATOMICAL_DICT[element];
                });
                var dermQuestUrl = 'https://www.dermquest.com/image-library/image-search/#image-search/' + lesionString + '&' + symptomsString + '&' + pathosString + '&' + anatomicalString + '&page=1';

                $('div#suggestions').html('suggestions<br>' + dermQuestUrl);

                Meteor.call('cross_origin_request', dermQuestUrl, function(error, result) {
                    console.log(result);
                });

                /*$.get( dermQuestUrl, function( data ) {
                    console.log(data);
                    alert( "Load was performed." );
                });*/
            }
        });
    }

});
