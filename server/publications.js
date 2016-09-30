//Meteor.publish('a_collection', function(){
//    return 'a_collection'.find();
//});

Meteor.publish('person', function(){
    return person.find();
});
