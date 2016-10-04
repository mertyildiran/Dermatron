//Meteor.subscribe('a_collection');
searchTextPatients = new ReactiveVar();
searchTextPatients.set('');
Tracker.autorun(function() {
    Meteor.subscribe('patients', searchTextPatients.get());
});
