
if (appointments.find().count() === 0) {
    for (var appointments_index = 0; appointments_index < 50; appointments_index++) {
        appointments.insert({
            createdAt: '2016-10-05 06:51:14',
            patientId: 'short string ' + appointments_index,
            appointmentDatetime: '2016-10-05 06:51:14',
            appointmentReason: 'this is a long text ' + appointments_index,
            symptoms: 'this is a long text ' + appointments_index,
            diagnosis: 'this is a long text ' + appointments_index,
            treatment: 'this is a long text ' + appointments_index,
            status: 'Option 1'
        });
    }
}
