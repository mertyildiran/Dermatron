Template.form_patients.onRendered(function () {

    $('.datepicker').pickadate({
      format: 'yyyy-mm-dd',
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 250, // Creates a dropdown of 15 years to control year
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

    $(document).ready(function() {
      $('select').material_select();
    });

    $('.datepicker').val(patients.findOne(Router.current().params._id).birthDate);

});
