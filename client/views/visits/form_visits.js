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
    },

    visitDate: function(visitDateTime) {
        if (visitDateTime) {
            return visitDateTime.split(/ /)[0];
        }
    },

    visitTime: function(visitDateTime) {
        if (visitDateTime) {
            return visitDateTime.split(/ /)[1];
        }
    },

    placeImage: function(data, captionImage) {
        if (data) {
            var image = '<figure> \
                <img alt="This visit" src="' + data + '" /> \
                <figcaption id="captured"><p>' + captionImage + '</p></figcaption> \
            </figure>';
            return image;
        } else {
            return '';
        }
    },

    previousImage: function(givenId, dateTime, captionLastVisit) {
        if (givenId) {
            var previousVisitImage = '<figure> \
                <img alt="Previous visit" src="' + visits.findOne({ patientId: givenId, visitDateTime: {$lt: dateTime} }, { sort: { visitDateTime: -1 } }).image + '" /> \
                <figcaption id="last-visit"><p>' + captionLastVisit + '</p></figcaption> \
            </figure>';
            return previousVisitImage;
        } else {
            return '';
        }
    }

});

Template.form_visits.onRendered(function () {

    $('.datepicker').pickadate({
      format: 'yyyy-mm-dd',
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 50, // Creates a dropdown of 15 years to control year
      labelMonthNext: translations.labelMonthNext[selectedLanguage],
      labelMonthPrev: translations.labelMonthPrev[selectedLanguage],
      labelMonthSelect: translations.labelMonthSelect[selectedLanguage],
      labelYearSelect: translations.labelYearSelect[selectedLanguage],
      monthsFull: translations.monthsFull[selectedLanguage],
      monthsShort: translations.monthsShort[selectedLanguage],
      weekdaysFull: translations.weekdaysFull[selectedLanguage],
      weekdaysShort: translations.weekdaysShort[selectedLanguage],
      weekdaysLetter: translations.weekdaysLetter[selectedLanguage],
      today: translations.today[selectedLanguage],
      clear: translations.clear[selectedLanguage],
      close: translations.close[selectedLanguage]
    });

    $('.timepicker').pickatime({
      autoclose: false,
      twelvehour: false
    });

    if ($('.multiple-select option:selected').val() == "") {
        $('.multiple-select option:selected').prop('disabled', true);
    }

    $(document).ready(function() {

        function asc_sort(a, b){
            return ($(b).text()) < ($(a).text()) ? 1 : -1;
        }

        // decending sort
        function dec_sort(a, b){
            return ($(b).text()) > ($(a).text()) ? 1 : -1;
        }

        $('ul').each(function( index ) {
            if ( $(this)[0].id.startsWith("select-options") ) {
                $(this).find('li').sort(asc_sort).appendTo( $(this) );
            }
        });

        $('select').each(function( index ) {
            if ( $(this)[0].id.startsWith("input_") ) {
                $(this).find('option').sort(asc_sort).appendTo( $(this) );
            }
        });

        $('select').material_select();

    });

    if (Router.current().params._id) {
        $('.datepicker').val(visits.findOne(Router.current().params._id).visitDateTime.split(/ /)[0]);
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
          height: 600,
          quality: 100,
        };

        MeteorCamera.locale.errorBrowserNotSupported = translations.errorBrowserNotSupported[selectedLanguage];
        MeteorCamera.locale.errorAccesingCamera = translations.errorAccesingCamera[selectedLanguage];
        MeteorCamera.locale.usePhoto = translations.usePhoto[selectedLanguage];
        MeteorCamera.locale.takeNewPhoto = translations.takeNewPhoto[selectedLanguage];
        MeteorCamera.locale.waitingPermissions = translations.waitingPermissions[selectedLanguage];
        MeteorCamera.locale.takePhoto = translations.takePhoto[selectedLanguage];
        MeteorCamera.locale.cancel = translations.cancel[selectedLanguage];
        MeteorCamera.locale.closePopup = translations.closePopup[selectedLanguage];
        MeteorCamera.locale.permissionsDenied = translations.permissionsDenied[selectedLanguage];
        MeteorCamera.locale.permissionsDeniedExp = translations.permissionsDeniedExp[selectedLanguage];
        MeteorCamera.locale.howToChrome = translations.howToChrome[selectedLanguage];
        MeteorCamera.locale.howToFirefox = translations.howToFirefox[selectedLanguage];
        MeteorCamera.locale.howToOpera = translations.howToOpera[selectedLanguage];

        MeteorCamera.getPicture(cameraOptions, function (error, data) {
            if (data) {
                imageCounter = 0;
                var capturedImage = '<figure> \
                    <canvas id="captured" width="600" height="450"></canvas> \
                    <figcaption id="captured"><p></p></figcaption> \
                </figure>';
                $('div#capturedImage').html(capturedImage);
                var canv = $('div#capturedImage canvas#captured')[0];
                var ctx = canv.getContext("2d");
                var img = new Image();
                img.onload = function() {
                    ctx.drawImage(img, 0, 0, canv.width, canv.height);
                    areaOfCaptured = drawContour(canv);
                    $('div#capturedImage figcaption#captured p').html(translations['Area'][selectedLanguage] + ': ' + areaOfCaptured + ' px<sup>2</sup>');
                    compareImages();
                }
                img.src = data;
                $('div#capturedImage').attr('value',data);


                try {
                    if ( $('#input_patientId').val() && visits.findOne({ patientId: $('#input_patientId').val() }, { sort: { visitDateTime: -1 } }) ) {
                        //var lastVisitImage = visits.findOne({ patientId: $('#input_patientId').val() }, { sort: { visitDate: -1, visitTime: 1} }).image;
                        var lastVisitImage = '<figure style="display: none;"> \
                            <canvas id="last-visit" width="600" height="450"></canvas> \
                            <figcaption id="last-visit"><p></p></figcaption> \
                        </figure>';
                        $('div#capturedImage').append(lastVisitImage);
                        var canv2 = $('div#capturedImage canvas#last-visit')[0];
                        var ctx2 = canv2.getContext("2d");
                        var img2 = new Image();
                        img2.onload = function() {
                            ctx2.drawImage(img2, 0, 0, canv2.width, canv2.height);
                            areaOfLastVisit = drawContour(canv2);
                            $('div#capturedImage figcaption#last-visit p').html('Area: ' + areaOfLastVisit + ' px<sup>2</sup>');
                            compareImages();
                        }
                        img2.src = visits.findOne({ patientId: $('#input_patientId').val() }, { sort: { visitDateTime: -1 } }).image;
                        $('figure').show('slow');
                    }
                }
                catch(err) {
                }

                var lesionString = '';
                var symptomsString = '';
                var pathosString = '';
                var anatomicalString = '';

                if ( $('#input_lesion').val() != '' ) {
                    var lesionParams = $('#input_lesion').val().toString().split(',');
                    lesionString = 'lesions=' + LESIONS_DICT[lesionParams[0]];
                    lesionParams.shift();
                    lesionParams.forEach(function(element, index, array) {
                        lesionString += '|' + LESIONS_DICT[element];
                    });
                }

                if ( $('#input_symptoms').val() != '' ) {
                    var symptomsParams = $('#input_symptoms').val().toString().split(',');
                    symptomsString = 'symptoms=' + SYMPTOMS_DICT[symptomsParams[0]];
                    symptomsParams.shift();
                    symptomsParams.forEach(function(element, index, array) {
                        symptomsString += '|' + SYMPTOMS_DICT[element];
                    });
                }

                if ( $('#input_pathophysiology').val() != '' ) {
                    var pathosParams = $('#input_pathophysiology').val().toString().split(',');
                    pathosString = 'pathos=' + PATHOS_DICT[pathosParams[0]];
                    pathosParams.shift();
                    pathosParams.forEach(function(element, index, array) {
                        pathosString += '|' + PATHOS_DICT[element];
                    });
                }

                if ( $('#input_anatomicalLocation').val() ) {
                    var anatomicalParams = $('#input_anatomicalLocation').val().toString().split(',');
                    anatomicalString = 'localization=' + ANATOMICAL_DICT[anatomicalParams[0]];
                    anatomicalParams.shift();
                    anatomicalParams.forEach(function(element, index, array) {
                        anatomicalString += '|' + ANATOMICAL_DICT[element];
                    });
                }

                var dermQuestUrl = 'https://www.dermquest.com/Services/imageData.ashx?' + lesionString + '&' + symptomsString + '&' + pathosString + '&' + anatomicalString + '&page=1&perPage=100&sort=relevance';
                var suggestionsDermQuest = '<br><i>' + translations['diagnosis suggestions from'][selectedLanguage] + ' DermQuest.com:</i><br>';
                //console.log(dermQuestUrl);

                Meteor.call('cross_origin_request', dermQuestUrl, function(error, result) {
                    var dJson = JSON.parse(result.content);
                    var largeImageUrl = 'https://www.dermquest.com/imagelibrary/large/';
                    var threeSample = _.sample(dJson['Results'], 3);
                    threeSample.forEach(function(element, index, array) {
                        suggestionsDermQuest += '<figure style="display: none;"> \
                            <img alt="' + DIAGNOSES_DICT_SWAP[element.diagnosis[0].Id] + '" value="' + element.diagnosis[0].Id + '" src="' + largeImageUrl + element.FileName + '" /> \
                            <figcaption><p>' + DIAGNOSES_DICT_SWAP[element.diagnosis[0].Id] + '</p></figcaption> \
                        </figure>';
                    });
                    if (threeSample != '') {
                        $('div#dermquest-suggestions').html(suggestionsDermQuest);
                        $('figure').show('slow');
                    }
                });

                var pngToMatrix = require('png-to-matrix');
                var smartcrop = require('smartcrop');
                var Clipper = require('image-clipper');

                var img = new Image();
                img.src = data;
                smartcrop.crop(img, {width: 64, height: 64}).then(function(smart){
                  Clipper(data, function() {
                        this.crop(smart.topCrop.x, smart.topCrop.y, smart.topCrop.height, smart.topCrop.width)
                        .resize(64, 64)
                        .quality(100)
                        .toDataURL(function(dataUrl) {
                            //console.log('cropped!');
                            //$('div#capturedImage img').attr('src', dataUrl);

                            pngToMatrix(dataUrl, (matrix) => {
                                var image = [];
                                var flattened = [].concat.apply([], matrix);
                                //console.log([].concat.apply([], flattened));

                                flattened.forEach(function(element, index, array) {
                                    image.push( (element['r'] * Math.pow(255, 2) + element['g'] * 255 + element['b']) / Math.pow(255, 3) );
                                });

                                //console.log(image.length);

                                var brain = require("brain");
                                HTTP.get(Meteor.absoluteUrl("/net.json"), function(err,result) {
                                    //console.log(result.data);
                                    var net = new brain.NeuralNetwork( { hiddenLayers: [16] } );
                                    net.fromJSON(result.data);
                                    var output = net.run(image);
                                    //console.log(output);
                                    var maxKey = _.max(Object.keys(output), function (o) { return output[o]; });
                                    //console.log(maxKey);
                                    var answer = DIAGNOSES_DICT_SWAP[maxKey];
                                    //console.log(answer);
                                    $('div#ai-suggestions').html('<i>' + translations['Artifical Intelligence thinks the diagnosis is'][selectedLanguage] + '</i> <b>' + answer + '</b>.');
                                });

                            });
                        });
                    });
                });

            }
        });
    },

    'click div#dermquest-suggestions figure': function(event) {
        $('#input_diagnosis').val($(event.currentTarget).find('img')[0].alt);
        $('#input_diagnosis').material_select();
    }

});

function area(points) {
    var l = points.length,
        det = 0;
    if (points[0] != points[points.length -1])
        points = points.concat(points[0]);
    for (var i = 0; i < l; i++)
        det += points[i].x * points[i + 1].y - points[i].y * points[i + 1].x;
    return Math.abs(det) / 2;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function drawContour(canv){
    var pix = require('pixfinder');

    ctx = canv.getContext('2d');

    var p = ctx.getImageData(canv.width/2, canv.height/2, 1, 1).data;
    var hex = ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    //console.log(hex);
    var dryShore = pix.find({
        img: canv,
        distance: 10,
        tolerance: 100,
        startPoint: {x: canv.width/2, y: canv.height/2},
        colors: [hex]
    });
    //console.log(dryShore);

    ctx.beginPath();
    ctx.moveTo(dryShore[0].x, dryShore[0].y);
    dryShore.forEach(function(point) {
        ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(38,166,154,0.0)';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(255,215,0,0.5)';
    ctx.stroke();

    return area(dryShore);

}

var imageCounter = 0;
var areaOfCaptured;
var areaOfLastVisit;

function compareImages() {
    imageCounter++;

    if (imageCounter >= 2) {
        if (areaOfCaptured > areaOfLastVisit) {
            $('div#capturedImage figcaption#captured p').html( $('div#capturedImage figcaption#captured p').html() + ' (' + translations['bigger'][selectedLanguage] + ')' );
            $('div#capturedImage figcaption#last-visit p').html( $('div#capturedImage figcaption#last-visit p').html() + ' (' + translations['smaller'][selectedLanguage] + ')' );
        } else if (areaOfCaptured < areaOfLastVisit) {
            $('div#capturedImage figcaption#captured p').html( $('div#capturedImage figcaption#captured p').html() + ' (' + translations['smaller'][selectedLanguage] + ')' );
            $('div#capturedImage figcaption#last-visit p').html( $('div#capturedImage figcaption#last-visit p').html() + ' (' + translations['bigger'][selectedLanguage] + ')' );
        } else {
            $('div#capturedImage figcaption#captured p').html( $('div#capturedImage figcaption#captured p').html() + ' (' + translations['exactly equal'][selectedLanguage] + ')' );
            $('div#capturedImage figcaption#last-visit p').html( $('div#capturedImage figcaption#last-visit p').html() + ' (' + translations['exactly equal'][selectedLanguage] + ')' );
        }
    }
}
