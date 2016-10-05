
if (patients.find().count() === 0) {
    for (var patients_index = 0; patients_index < 50; patients_index++) {
        patients.insert({
            createdAt: '2016-10-05 05:28:04',
            name: 'short string ' + patients_index,
            surname: 'short string ' + patients_index,
            gender: 'Option 1',
            birthDate: '2016-10-04',
            nationalId: 'short string ' + patients_index,
            socialSecurityType: 'Option 1',
            socialSecurityNumber: 'short string ' + patients_index,
            isPatientDisabled: true,
            bloodGroup: 'Option 1',
            email: 'foobar@foo.bar',
            phone: '+00 000 000 000',
            address: 'this is a long text ' + patients_index
        });
    }
}
