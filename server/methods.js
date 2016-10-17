Meteor.methods({

    delete_selected_visits: function(selectedIds) {
        visits.remove(selectedIds);
    },

    update_visits: function(id, object_visits) {
        visits.update({_id: id}, {$set: object_visits });
    },

    delete_visits: function(visitsId) {
        visits.remove(visitsId);
    },

    insert_visits: function(object_visits) {
        var today = new Date();
        var date = today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2);
        var time = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + today.getSeconds();
        object_visits.createdAt = date+' '+time;
        var visitsId = visits.insert(object_visits);
        return visitsId;
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
        var today = new Date();
        var date = today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2);
        var time = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + today.getSeconds();
        object_patients.createdAt = date+' '+time;
        var patientsId = patients.insert(object_patients);
        return patientsId;
    },

});
