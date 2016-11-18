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
            language: tpl.find('#input_language').value
        };

        // the method returns the new object id after saving it into the db
        Meteor.call('update_settings', this._id, updated_settings);
        load_constants(updated_settings.language);
        ClockPicker.DEFAULTS.donetext = translations.clockDone[updated_settings.language];
        Router.go('index');

    }
});
