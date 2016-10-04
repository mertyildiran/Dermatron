//Meteor.subscribe('a_collection');
searchTextPatients = new ReactiveVar();
searchTextPatients.set('');
Tracker.autorun(function() {
    Meteor.subscribe('patients', searchTextPatients.get());
});
searchTextAppointments = new ReactiveVar();
searchTextAppointments.set('');
Tracker.autorun(function() {
    Meteor.subscribe('appointments', searchTextAppointments.get());
});
