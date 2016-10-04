
if (medicines.find().count() === 0) {
    for (var medicines_index = 0; medicines_index < 50; medicines_index++) {
        medicines.insert({
            createdAt: '2016-10-04',
            name: 'short string ' + medicines_index,
            description: 'this is a long text ' + medicines_index,
            brand: 'short string ' + medicines_index
        });
    }
}
