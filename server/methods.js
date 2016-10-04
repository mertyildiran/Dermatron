Meteor.methods({
 
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
