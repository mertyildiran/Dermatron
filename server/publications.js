//Meteor.publish('a_collection', function(){
//    return 'a_collection'.find();
//});
Meteor.publish('patients', function(searchText) {
    if (!searchText) {
        return patients.find();
    }
    return patients.find( { $or: [ {createdAt: { $regex: searchText }}, {name: { $regex: searchText }}, {surname: { $regex: searchText }}, {gender: { $regex: searchText }}, {birthDate: { $regex: searchText }}, {nationalId: { $regex: searchText }}, {socialSecurityType: { $regex: searchText }}, {socialSecurityNumber: { $regex: searchText }}, {isPatientDisabled: { $regex: searchText }}, {bloodType: { $regex: searchText }}, {email: { $regex: searchText }}, {phone: { $regex: searchText }}, {address: { $regex: searchText }}, {dermatologicHistory: { $regex: searchText }},  ] }, {} );
});
Meteor.publish('visits', function(searchText) {
    if (!searchText) {
        return visits.find();
    }
    return visits.find( { $or: [ {createdAt: { $regex: searchText }}, {patientName: { $regex: searchText }}, {visitDateTime: { $regex: searchText }}, {lesion: { $regex: searchText }}, {symptoms: { $regex: searchText }}, {pathophysiology: { $regex: searchText }}, {anatomicalLocation: { $regex: searchText }}, {diagnosis: { $regex: searchText }}, {status: { $regex: searchText }}, {prescription: { $regex: searchText }},  ] }, {} );
});
Meteor.publish('settings', function() {
    return settings.find();
});
