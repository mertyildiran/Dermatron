//Meteor.publish('a_collection', function(){
//    return 'a_collection'.find();
//});
Meteor.publish('patients', function(searchText) {
    if (!searchText) {
        return patients.find();
    }
    return patients.find( { $or: [ {createdAt: { $regex: searchText }}, {name: { $regex: searchText }}, {surname: { $regex: searchText }}, {gender: { $regex: searchText }}, {birthDate: { $regex: searchText }}, {nationalId: { $regex: searchText }}, {socialSecurityType: { $regex: searchText }}, {socialSecurityNumber: { $regex: searchText }}, {isPatientDisabled: { $regex: searchText }}, {bloodGroup: { $regex: searchText }}, {email: { $regex: searchText }}, {phone: { $regex: searchText }}, {address: { $regex: searchText }},  ] }, {} );
});
Meteor.publish('appointments', function(searchText) {
    if (!searchText) {
        return appointments.find();
    }
    return appointments.find( { $or: [ {createdAt: { $regex: searchText }}, {patientId: { $regex: searchText }}, {appointmentDate: { $regex: searchText }}, {appointmentTime: { $regex: searchText }}, {status: { $regex: searchText }},  ] }, {} );
});
