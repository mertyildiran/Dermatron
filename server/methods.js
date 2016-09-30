Meteor.methods({
 
    delete_selected_person: function(selectedIds) { 
        person.remove(selectedIds); 
    }, 
 
    update_person: function(id, object_person) { 
        person.update({_id: id}, {$set: object_person }); 
    }, 
 
    delete_person: function(personId) { 
        person.remove(personId); 
    }, 
 
    insert_person: function(object_person) { 
        var personId = person.insert(object_person); 
        return personId; 
    }, 

});
