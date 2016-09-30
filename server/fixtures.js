//if (a_collection.find().count() === 0) {
    //
//}

if (person.find().count() === 0) {
    for (var person_index = 0; person_index < 5; person_index++) {
        person.insert({
            name: 'short string ' + person_index,
            registered: '2016-09-30',
            isAdmin: true
        });
    }
}
