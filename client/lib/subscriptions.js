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

Meteor.subscribe('settings');
