Meteor.methods({

    delete_selected_medicines: function(selectedIds) {
        medicines.remove(selectedIds);
    },

    update_medicines: function(id, object_medicines) {
        medicines.update({_id: id}, {$set: object_medicines });
    },

    delete_medicines: function(medicinesId) {
        medicines.remove(medicinesId);
    },

    insert_medicines: function(object_medicines) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        object_medicines.createdAt = date+' '+time;
        var medicinesId = medicines.insert(object_medicines);
        return medicinesId;
    },

    delete_selected_diseases: function(selectedIds) {
        diseases.remove(selectedIds);
    },

    update_diseases: function(id, object_diseases) {
        diseases.update({_id: id}, {$set: object_diseases });
    },

    delete_diseases: function(diseasesId) {
        diseases.remove(diseasesId);
    },

    insert_diseases: function(object_diseases) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        object_diseases.createdAt = date+' '+time;
        var diseasesId = diseases.insert(object_diseases);
        return diseasesId;
    },

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
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        object_appointments.createdAt = date+' '+time;
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
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        object_patients.createdAt = date+' '+time;
        var patientsId = patients.insert(object_patients);
        return patientsId;
    },

});
