
if (diseases.find().count() === 0) {
    for (var diseases_index = 0; diseases_index < 50; diseases_index++) {
        diseases.insert({
            createdAt: '2016-10-04',
            name: 'short string ' + diseases_index,
            description: 'this is a long text ' + diseases_index
        });
    }
}
