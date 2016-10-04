
if (appointments.find().count() === 0) {
    for (var appointments_index = 0; appointments_index < 50; appointments_index++) {
        appointments.insert({
            createdAt: '2016-10-04',
            patientId: 'short string ' + appointments_index,
            appointmentDate: '2016-10-04',
            appointmentTime: 'short string ' + appointments_index,
            status: 'Option 1'
        });
    }
}
