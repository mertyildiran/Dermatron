Meteor.methods({
 
    delete_selected_appointments: function(selectedIds) { 
        appointments.remove(selectedIds); 
    }, 
 
    update_appointments: function(id, object_appointments) { 
        appointments.update({_id: id}, {$set: object_appointments }); 
    }, 
 
    delete_appointments: function(appointmentsId) { 
        appointments.remove(appointmentsId); 
    }, 
 
    insert_appointments: function(object_appointments) { 
        var appointmentsId = appointments.insert(object_appointments); 
        return appointmentsId; 
    }, 
 
    delete_selected_patients: function(selectedIds) { 
        patients.remove(selectedIds); 
    }, 
 
    update_patients: function(id, object_patients) { 
        patients.update({_id: id}, {$set: object_patients }); 
    }, 
 
    delete_patients: function(patientsId) { 
        patients.remove(patientsId); 
    }, 
 
    insert_patients: function(object_patients) { 
        var patientsId = patients.insert(object_patients); 
        return patientsId; 
    }, 

});
