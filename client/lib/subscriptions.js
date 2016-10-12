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
searchTextDiseases = new ReactiveVar();
searchTextDiseases.set('');
Tracker.autorun(function() {
    Meteor.subscribe('diseases', searchTextDiseases.get());
});
searchTextMedicines = new ReactiveVar();
searchTextMedicines.set('');
Tracker.autorun(function() {
    Meteor.subscribe('medicines', searchTextMedicines.get());
});
