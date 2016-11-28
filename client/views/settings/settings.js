Template.settings.onRendered(function () {
    $(document).ready(function() {
      $('select').material_select();
    });
});

Template.settings.helpers ({
    codeToLanguage: function(code) {
        var languagesDict = {
            en_US: "English (United States)",
            en_GB: "English (Great Britain)",
            tr_TR: "Türkçe"
        }
        return languagesDict[code];
    }
});

Template.settings.events ({
    'click #save': function(evt, tpl) {
        evt.preventDefault();

        var updated_settings = {
            language: tpl.find('#input_language').value,
            unitOfLength: tpl.find('#input_unitOfLength').value,
            dermatoscopeFactor: tpl.find('#input_dermatoscopeFactor').value
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('update_settings', this._id, updated_settings);
        load_constants(updated_settings.language);
        ClockPicker.DEFAULTS.donetext = translations.clockDone[updated_settings.language];

        scheduler.locale.date.month_full = translations.monthsFull[updated_settings.language];
        scheduler.locale.date.month_short = translations.monthsShort[updated_settings.language];
        scheduler.locale.date.day_full = translations.weekdaysFull[updated_settings.language];
        scheduler.locale.date.day_short = translations.weekdaysShort[updated_settings.language];
        scheduler.locale.labels.dhx_cal_today_button = translations.today[updated_settings.language];
        scheduler.locale.labels.day_tab = translations.day[updated_settings.language];
        scheduler.locale.labels.week_tab = translations.week[updated_settings.language];
        scheduler.locale.labels.month_tab = translations.month[updated_settings.language];

        Router.go('index');

    },
    'click #exit': function(evt, tpl) {
        evt.preventDefault();
        Electrify.call('exit', [], function(err, msg) {
            console.log(msg);
        });
    }
});
