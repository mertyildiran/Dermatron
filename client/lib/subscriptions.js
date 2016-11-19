//Meteor.subscribe('a_collection');
searchTextPatients = new ReactiveVar();
searchTextPatients.set('');
Tracker.autorun(function() {
    Meteor.subscribe('patients', searchTextPatients.get());
});
searchTextVisits = new ReactiveVar();
searchTextVisits.set('');
Tracker.autorun(function() {
    Meteor.subscribe('visits', searchTextVisits.get());
});

Meteor.subscribe('settings', function() {
    load_constants(settings.findOne().language);
    ClockPicker.DEFAULTS.donetext = translations.clockDone[settings.findOne().language];

    scheduler.locale.date.month_full = translations.monthsFull[settings.findOne().language];
    scheduler.locale.date.month_short = translations.monthsShort[settings.findOne().language];
    scheduler.locale.date.day_full = translations.weekdaysFull[settings.findOne().language];
    scheduler.locale.date.day_short = translations.weekdaysShort[settings.findOne().language];
    scheduler.locale.labels.dhx_cal_today_button = translations.today[settings.findOne().language];
    scheduler.locale.labels.day_tab = translations.day[settings.findOne().language];
    scheduler.locale.labels.week_tab = translations.week[settings.findOne().language];
    scheduler.locale.labels.month_tab = translations.month[settings.findOne().language];

    Router.go('index');
});
